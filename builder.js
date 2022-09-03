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
    if (json.menu != undefined) build_menu(json.menu)
    document.getElementsByClassName("grid-2")[0].replaceChild(section_1(json.section_1, json.section_2), document.getElementsByClassName("section-1")[0])
    if (json.section_2 != undefined) document.getElementsByClassName("grid-2")[0].replaceChild(section_2(json.section_2), document.getElementsByClassName("section-2")[0])
}

function build_menu(menu) {
    for (var i=0; i<menu.length; i++) {
        const entry = document.createElement("a")
        entry.href = menu[i].href
        entry.innerHTML = '← ' + menu[i].name
        for (var j=0; j<i; j++) {
            entry.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + entry.innerHTML
        }
        const menu_entry = document.createElement("p")
        if (i==0) menu_entry.style["margin-top"] = "1em"
        menu_entry.id = "menu_entry"
        menu_entry.appendChild(entry) 
        document.body.insertBefore(menu_entry, document.body.children[0]);
    }
}

function section_1(section_1, section_2) {
    const div = document.createElement("div")
    if (section_1.image != undefined) {
        const image = document.createElement("img")
        image.src = section_1.image
        image.style["border-radius"] = "50%"
        image.style["width"] = "200px"
        div.appendChild(image)
    }
    if (section_1.title != undefined) {
        const title = document.createElement("h1")
        title.innerHTML = section_1.title
        div.appendChild(title)
    }
    const subtitle = document.createElement("h2")
    subtitle.innerHTML = section_1.subtitle
    subtitle.style["padding-right"] = "30px"
    subtitle.style["padding-left"] = "30px"
    div.appendChild(subtitle)
    const br = document.createElement("br")
    br.id = "br"
    div.appendChild(br)
    for (var i=0; i<section_1.lines.length; i++) {
        const line = document.createElement("p")
        line.style["padding-right"] = "100px"
        line.style["padding-left"] = "100px"
        line.innerHTML = section_1.lines[i]
        div.appendChild(line)
    }
    if (section_2 != undefined) {
        var keys = Object.keys(section_2)
        for (var i=0; i<keys.length; i++) {
            const link = document.createElement("a")
            link.href = "#" + keys[i]
            link.onclick = function toggle() {
                console.log(keys[i])
                console.log(this)
            }
            link.innerHTML = '→ ' + keys[i]
            const br = document.createElement("br")
            div.appendChild(br)
            div.appendChild(link)
        }
    }
    div.className = "section-1"
    return div
}

function section_2(section_2) {
    const div = document.createElement("div")
    var categories = Object.keys(section_2)
    for(var i=0; i<categories.length; i++) {
        const category = document.createElement('div')
        category.id = categories[i]
        var subcategories = Object.keys(categories)
        for(var j=0; j<subcategories.length; j++) {
            const subcategory = document.createElement('h3')
            subcategory.innerHTML = subcategories[j].title
            category.appendChild(subcategory)
        }
        div.appendChild(category)
    }

    div.className = "section-2"
    return div
}
