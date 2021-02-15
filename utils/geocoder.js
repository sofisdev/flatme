const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'openstreetmap'
};
 
const geocoder = NodeGeocoder(options);
 
//Export
module.exports = geocoder;