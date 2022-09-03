function read(file, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var json = JSON.parse(rawFile.responseText);
                console.log(json)
                callback(json);
            }
        }
    }
    rawFile.send(null);
}

function build(json) {
    document.title = json.title
    build_menu(json.menu)
    const grid_2 = document.createElement("div")
    grid_2.class = "grid-2"
    grid_2.appendChild(section_1(json.section_1))
    if (json.section_2 != undefined) grid_2.appendChild(section_2(json.section_2))
    document.body.appendChild(grid_2)
}

function build_menu(menu) {
    for (var i=0; i<menu.length; i++) {
        const entry = document.createElement("a")
        entry.href = menu[i].href
        entry.innerHTML = menu[i].name
        for (var j=0; j<i; j++) {
            entry.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + entry.innerHTML
        }
        const menu_entry = document.createElement("p")
        if (i==0) menu_entry.style["margin-top"] = "1em"
        menu_entry.id = "menu_entry"
        menu_entry.appendChild(entry) 
        document.body.appendChild(menu_entry)  
    }
}

function section_1(section_1) {
    const div = document.createElement("div")
    const title = document.createElement("h1")
    title.innerHTML = section_1.title
    div.appendChild(title)
    const subtitle = document.createElement("h2")
    subtitle.innerHTML = section_1.subtitle
    div.appendChild(subtitle)
    for (var i=0; i<section_1.lines.length; i++) {
        const line = document.createElement("p")
        line.style["padding-right"] = "100px"
        line.style["padding-left"] = "100px"
        line.innerHTML = section_1.lines[i]
        div.appendChild(line)
    }
    div.className = "section-1"
    return div
}

function section_2(section_2) {
    const div = document.createElement("div")
    div.className = "section-2"
    return div
}
