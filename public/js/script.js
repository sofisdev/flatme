// const {arr} = require("../../routes/index.js");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("flatme JS imported successfully!");
  },
  false
);

let map = L.map('map').setView([40.341705, -17.968551], 1.2)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

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
  })
  .catch((err) => console.log(err))


