var mymap = L.map('mapid').setView([-33.76741, 151.069109], 17);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


fetch('http://localhost:3000/items')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    myJson.forEach((item) => {
      console.log(item.coordinates);
      L.marker(item.coordinates.reverse()).addTo(mymap)
      .bindPopup(`<b><a href="http://localhost:3000/items/${item._id}">${item.name}</a></b><br>I am a popup. `);
    })
    // console.log(myJson[0].coordinates);
  });
