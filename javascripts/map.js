var mymap = L.map('mapid').setView([-33.76741, 151.069109], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const query_string = window.location.search;
console.log(query_string);
const params = new URLSearchParams(query_string);
const query = params.get('keywords');
fetch(`http://localhost:3000/items/search?keywords=${query}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
    myJson.forEach((item) => {
      console.log(item.coordinates);
      L.marker(item.coordinates.reverse()).addTo(mymap)
      .bindPopup(`
        <b><a href="http://localhost:8080/item?id=${item._id}">${item.name}</a></b>
        <br>${item.description}
        `);
    })
    // console.log(myJson[0].coordinates);
  });
