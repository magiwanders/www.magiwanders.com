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
        const menu_div = document.createElement("div")
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
        menu_div.style.position = 'sticky'
        menu_div.style.top = '10px'
        menu_div.appendChild(menu_entry)
        document.body.insertBefore(menu_div, document.body.children[0]);
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
            const category_link = document.createElement("a")
            category_link.href = "#" + keys[i]
            // category_link.style.color = color(i%10)
            category_link.id = i%10
            category_link.addEventListener('mouseenter', (e) => {e.target.style.color = color(parseInt(e.target.id))})
            category_link.addEventListener('mouseout', (e) => {e.target.style.color = "#7A7C80"})
            // link.onclick = (e) => {
            //     var section_2_children = document.getElementsByClassName('section-2')[0].children
            //     for (var j=0; j < section_2_children.length; j++) {
            //         console.log(section_2_children[j].id, e.target.className)
            //         if (section_2_children[j].id == e.target.className) {
            //             section_2_children[j].style.display = 'block'
            //         } else {
            //             section_2_children[j].style.display = 'none'
            //         }
            //     }

            // }
            category_link.innerHTML = '→ ' + keys[i]
            const br = document.createElement("br")
            sticky.appendChild(br)
            sticky.appendChild(category_link)
        }
        sticky.style.position = 'sticky'
        sticky.style.top = '100px'
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
        category_title.style.color = color(i%10)
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
                link.style.color = color(i%10)
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
            subcategory.style['padding-left'] = '2.5em'
            subcategory.style['text-indent'] = '-2.5em'
            category.appendChild(subcategory)
        }
        if (i>0) {
            const separator = document.createElement('br')
            div.appendChild(separator)
            const separator2 = document.createElement('br')
            div.appendChild(separator2)
        }
        category.id = categories[i]
        div.appendChild(category)
    }

    div.className = "section-2"
    return div
}

function color(n) {
    switch(n) {
        case 0: return "#dd7e6b"; // light red berry 2
        case 1: return "#ea9999"; // light red 2	
        case 2: return "#f9cb9c"; // light orange 2	
        case 3: return "#ffe599"; // light yellow 2
        case 4: return "#b6d7a8"; // light green 2
        case 5: return "#a2c4c9"; // light cyan 2	  
        case 6: return "#a4c2f4"; // light cornflower blue 2
        case 7: return "#9fc5e8"; // light blue 2	    
        case 8: return "#b4a7d6"; // light purple 2  
        case 9: return "#d5a6bd"; // light magenta 2
        default: return "#ffffff"; // White
    }
}