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

async function getReviews() {
  const res = await fetch('/flatme/comments')
}

getReviews()

module.exports = map

