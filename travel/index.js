const world = Globe()(document.getElementById('globeViz'))
  .globeImageUrl('https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-night.jpg')
  .pointOfView({ altitude: 2 }, 1000)
    // .onZoom(zoomHandle)

//   world.controls().autoRotate = false;
//   world.controls().autoRotateSpeed = 1.8;


fetch('countries.geojson')
  .then(res => res.json())
  .then(countries => {
        world
        .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
        .polygonCapColor(country => {
            if (country.properties.ADMIN in myTravels) return color(myTravels[country.properties.ADMIN])
        })
        .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
        .polygonStrokeColor(() => 'rgba(255, 255, 255, 255)')
        .polygonLabel(({ properties: country }) => {
            let message = `<b>${country.ADMIN}</b>`
            if (country.ADMIN in myTravels) {
                let destination = myTravels[country.ADMIN]
                if (destination.lived != undefined) 
                    for (let i=0; i<destination.lived.length; i++) message += `<br /> Lived: ${destination.lived[i]}`
                if (destination.travelled != undefined) 
                    for (let i=0; i<destination.travelled.length; i++) message += `<br /> Visited: ${destination.travelled[i].when}`
                message += `<button> Info </button>`           
            }
            return message
        })
        .polygonsTransitionDuration(250)
        .onPolygonClick( (polygon, event, { lat, lng, altitude }) => {
            document.getElementById('title').scrollIntoView();
            console.log(polygon, event, lat, lng, altitude)
            console.log(myTravels[polygon.properties.ADMIN].description)
            document.getElementById('title').innerHTML = myTravels[polygon.properties.ADMIN].description.title
            document.getElementById('par').innerHTML = myTravels[polygon.properties.ADMIN].description.par
        })
        .onPolygonHover((polygon, prevPolygon) => {
            if (polygon!=null) {
                world.polygonAltitude(country => {
                  if (country.properties.ADMIN==polygon.properties.ADMIN) {
                    return 0.02
                  } else return 0.01
                })
                world.polygonCapColor(country => {
                  if (country.properties.ADMIN==polygon.properties.ADMIN) {
                    return 'rgba(255, 255, 255, 0.5)'
                  } else return color(myTravels[country.properties.ADMIN])
                })
              }
        })
});

// fetch('cities.geojson') 
//     .then(res => res.json())
//     .then(places => {
//         console.log(places)
//         world
//         .labelsData(places.features)
//         .labelLat(d => d.properties.latitude)
//         .labelLng(d => d.properties.longitude)
//         .labelText(d => d.properties.name)
//         // .labelSize(d => Math.sqrt(d.properties.pop_max) * 4e-4)
//         // .labelDotRadius(d => Math.sqrt(d.properties.pop_max) * 4e-4)
//         .labelColor(() => 'rgba(255, 255, 255, 0.75)')
//         // .labelResolution(2)
//         .labelAltitude((country) => 0.011)
//         .onLabelClick((label, event, { lat, lng, altitude }) => {
//             console.log(label)
//         })
// });

function color(destination) {
    if (destination == undefined) return 'rgba(55, 55, 55, 0.5)'
    if (destination.lived != undefined) return  'rgba(63, 132, 229, 0.5)'
    if (destination.travelled != undefined) return  'rgba(12, 124, 89, 0.5)'
    if (destination.desired == true ) return  'rgba(255,188,68, 0.5)'
    else return 'rgba(55, 55, 55, 0.5)'
}