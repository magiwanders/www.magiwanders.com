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
        const sticky = document.createElement("div")
        var keys = Object.keys(section_2)
        for (var i=0; i<keys.length; i++) {
            const link = document.createElement("a")
            link.className = keys[i]
            link.href = "#" + keys[i]
            link.onclick = (e) => {
                var section_2_children = document.getElementsByClassName('section-2')[0].children
                for (var j=0; j < section_2_children.length; j++) {
                    console.log(section_2_children[j].id, e.target.className)
                    if (section_2_children[j].id == e.target.className) {
                        section_2_children[j].style.display = 'block'
                    } else {
                        section_2_children[j].style.display = 'none'
                    }
                }

            }
            link.innerHTML = '→ ' + keys[i]
            const br = document.createElement("br")
            sticky.appendChild(br)
            sticky.appendChild(link)
        }
        sticky.style.position = 'sticky'
        div.appendChild(sticky)
    }
    div.className = "section-1"
    return div
}

function section_2(section_2) {
    const div = document.createElement("div")
    var categories = Object.keys(section_2)
    for(var i=0; i<categories.length; i++) {
        console.log(categories[i])
        const category = document.createElement('div')
        category.innerHTML = ''
        var subcategories = Object.keys(section_2[categories[i]])
        const category_title = document.createElement('h1')
        category_title.innerHTML = categories[i]
        category.appendChild(category_title)
        for(var j=0; j<subcategories.length; j++) {
            console.log('     ' + subcategories[i])
            const subcategory = document.createElement('div')
            const title = document.createElement('h2')
            title.innerHTML = "&nbsp;&nbsp;" + subcategories[j]
            subcategory.appendChild(title)
            var list = Object.keys(section_2[categories[i]][subcategories[j]])
            for (var k=0; k<list.length; k++) {
                console.log('          ' + list[k])
                const link_div = document.createElement('div')
                const link = document.createElement('a')
                link.href = section_2[categories[i]][subcategories[j]][list[k]].href
                link.style.display = 'inline'
                link.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + list[k] 
                link_div.appendChild(link)
                const description = document.createElement('p')
                if (section_2[categories[i]][subcategories[j]][list[k]].description!=undefined) {
                    description.innerHTML = ' - ' + section_2[categories[i]][subcategories[j]][list[k]].description
                    description.style.display = 'inline'
                    description.style['font-size'] = '0.75em'
                    link_div.appendChild(description)
                }
                link_div.style['padding-left'] = '9em'
                link_div.style['text-indent'] = '-9em'
                subcategory.appendChild(link_div)
            }
            category.appendChild(subcategory)
        }
        category.id = categories[i]
        category.style['padding-left'] = '5em'
        category.style['text-indent'] = '-5em'
        div.appendChild(category)
    }

    div.className = "section-2"
    return div
}
