#!/usr/bin/env python3
"""Push to GitHub, then mirror the committed tree to the FTP server.

Only committed files are deployed (git ls-files / git diff), so .env and
anything untracked never reach the server. The deployed commit is stored
on the server in .deploy-rev, so each run uploads only what changed since
then and deletes files removed from the repo.

Files matching the glob patterns in .deployignore (plus DEPLOY_EXCLUDE in
.env, if set) are never uploaded.

Usage: ./deploy.py [--dry-run] [--full] [--no-push]
       ./deploy.py --ls [DIR]              list a remote directory
       ./deploy.py --purge DIR [--dry-run] delete a remote directory recursively
"""
import argparse
import fnmatch
import ftplib
import io
import posixpath
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REV_FILE = ".deploy-rev"


def git(*args):
    return subprocess.run(["git", "-C", str(ROOT), *args], check=True,
                          capture_output=True, text=True).stdout


def load_env():
    env_path = ROOT / ".env"
    if not env_path.exists():
        sys.exit("Missing .env -- copy .env.example to .env and fill it in.")
    env = {}
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def connect(env):
    cls = ftplib.FTP_TLS if env.get("FTP_TLS", "1") == "1" else ftplib.FTP
    ftp = cls()
    ftp.connect(env["FTP_HOST"], int(env.get("FTP_PORT", 21)), timeout=30)
    try:
        ftp.login(env["FTP_USER"], env["FTP_PASS"])
    except ftplib.error_perm as e:
        if isinstance(ftp, ftplib.FTP_TLS) and str(e).startswith("500"):
            sys.exit(f"Server does not support FTPS ({e}). Set FTP_TLS=0 in .env.")
        raise
    if isinstance(ftp, ftplib.FTP_TLS):
        ftp.prot_p()
    ftp.cwd(env.get("FTP_DIR", "/") or "/")
    return ftp


def remote_rev(ftp):
    buf = io.BytesIO()
    try:
        ftp.retrbinary(f"RETR {REV_FILE}", buf.write)
    except ftplib.error_perm:
        return None
    return buf.getvalue().decode().strip() or None


def load_excludes(env):
    patterns = env.get("DEPLOY_EXCLUDE", "").split()
    ignore = ROOT / ".deployignore"
    if ignore.exists():
        for line in ignore.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#"):
                patterns.append(line)
    return patterns


def purge(ftp, path, dry_run):
    """Recursively delete a remote directory (relative to FTP_DIR)."""
    try:
        entries = list(ftp.mlsd(path, facts=["type"]))
    except ftplib.error_perm as e:
        print(f"  {path}: {e}")
        return
    for name, facts in entries:
        if name in (".", ".."):
            continue
        child = f"{path}/{name}"
        if facts.get("type") == "dir":
            purge(ftp, child, dry_run)
        else:
            print("  del", child)
            if not dry_run:
                ftp.delete(child)
    print("  rmdir", path)
    if not dry_run:
        ftp.rmd(path)


def ensure_dir(ftp, path, made):
    parts = [p for p in posixpath.dirname(path).split("/") if p]
    for i in range(1, len(parts) + 1):
        d = "/".join(parts[:i])
        if d in made:
            continue
        try:
            ftp.mkd(d)
        except ftplib.error_perm:
            pass  # already exists
        made.add(d)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="show what would change, touch nothing")
    ap.add_argument("--full", action="store_true", help="re-upload every tracked file")
    ap.add_argument("--no-push", action="store_true", help="skip git push")
    ap.add_argument("--ls", nargs="?", const=".", metavar="DIR",
                    help="list a remote directory (relative to FTP_DIR) and exit")
    ap.add_argument("--purge", metavar="DIR",
                    help="recursively delete a remote directory (relative to FTP_DIR) and exit")
    args = ap.parse_args()

    env = load_env()
    if args.ls:
        ftp = connect(env)
        print(f"==> {ftp.pwd()}  ls {args.ls}")
        ftp.retrlines(f"LIST {args.ls}")
        ftp.quit()
        return
    if args.purge:
        target = posixpath.normpath(args.purge.strip("/"))
        if target in (".", "..", "") or target.startswith("../"):
            sys.exit(f"Refusing to purge {args.purge!r}")
        ftp = connect(env)
        print(f"==> {ftp.pwd()}  purge {target}" + (" (dry run)" if args.dry_run else ""))
        purge(ftp, target, args.dry_run)
        ftp.quit()
        return
    excludes = load_excludes(env)
    skip = lambda f: any(fnmatch.fnmatch(f, p) for p in excludes)

    if git("status", "--porcelain").strip():
        print("Warning: uncommitted changes are NOT deployed (only HEAD is).")
    head = git("rev-parse", "HEAD").strip()

    if not args.no_push and not args.dry_run:
        print("==> git push")
        subprocess.run(["git", "-C", str(ROOT), "push"], check=True)

    print(f"==> FTP {env['FTP_HOST']}:{env.get('FTP_DIR', '/')}")
    ftp = connect(env)
    prev = None if args.full else remote_rev(ftp)

    upload, delete = [], []
    if prev:
        try:
            git("cat-file", "-e", f"{prev}^{{commit}}")
        except subprocess.CalledProcessError:
            print(f"Remote rev {prev[:7]} unknown locally, doing full upload.")
            prev = None
    if prev == head:
        print("Server already at", head[:7])
        ftp.quit()
        return
    if prev:
        print(f"Incremental {prev[:7]} -> {head[:7]}")
        for line in git("diff", "--name-status", "--no-renames", prev, head).splitlines():
            status, path = line.split("\t", 1)
            (delete if status == "D" else upload).append(path)
    else:
        print(f"Full upload of {head[:7]}")
        upload = git("ls-files").splitlines()

    upload = [f for f in upload if not skip(f)]
    delete = [f for f in delete if not skip(f)]

    made = set()
    for f in upload:
        print("  put", f)
        if args.dry_run:
            continue
        ensure_dir(ftp, f, made)
        with open(ROOT / f, "rb") as fh:
            ftp.storbinary(f"STOR {f}", fh)
    for f in delete:
        print("  del", f)
        if args.dry_run:
            continue
        try:
            ftp.delete(f)
        except ftplib.error_perm as e:
            print("    (skip:", e, ")")

    if not args.dry_run:
        ftp.storbinary(f"STOR {REV_FILE}", io.BytesIO(head.encode() + b"\n"))
    ftp.quit()
    print(f"Done: {len(upload)} uploaded, {len(delete)} deleted" + (" (dry run)" if args.dry_run else ""))


if __name__ == "__main__":
    main()
