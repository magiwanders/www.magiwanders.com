# www.magiwanders.com: notes for Claude

- The live site is hosted on Infomaniak FTP, not GitHub Pages.
- `./deploy.py` = git push + incremental FTP upload of committed files (state in the remote `.deploy-rev`). Flags:
  `--dry-run`, `--full`, `--no-push`, `--ls [DIR]`, `--purge DIR`. On the home server run it with
  `SSH_AUTH_SOCK=~/.ssh/claude-agent.sock` for the push.
- Committed files that must not be uploaded are listed in `.deployignore` (incl. `old/*` and this file).
- FTP credentials are in the gitignored `.env`; Claude is not allowed to read or edit it, the owner changes it.
- CV PDFs are named `simone_shawn_cazzaniga_cv_<YYMM>[_1page].pdf` and linked only via `redirects/cv.html` /
  `redirects/cv_1page.html`: a CV update = swap the PDF + edit the redirect. The 1-page one is generated in
  /var/www/europass_condenser (private repo, `.venv/bin/python condense.py <json>`).
- Machine-local notes: `CLAUDE.local.md` (gitignored).
