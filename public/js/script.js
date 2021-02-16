// const {arr} = require("../../routes/index.js");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("flatme JS imported successfully!");
  },
  false
);

let map = L.map('map').setView([40.4166000, -3.7038400], 5)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

let locIcon = L.icon({
  iconUrl: '../images/location.png',
  iconSize: [19, 39],
  iconAnchor: [11, 39],
});

//get coordinates from client-side
const MONGO_URI = "http://localhost:27017/flatme/comments";
let coordArr =[] 
//Please update URL when connecting to MongoDB Atlas
axios.get('http://localhost:3000/flatmecoordinates')
  .then((result) => {
    result.data.forEach(element => {
      if(element.idGeo) {
        coordArr.push(element.idGeo.coordinates)
      }
    });
    console.log(coordArr)
    for(let i = 0; i < coordArr.length; i++) {  
      let marker = new L.Marker([coordArr[i][1], coordArr[i][0]], {icon: locIcon}).addTo(map)
    }
  })
  .catch((err) => console.log(err))



