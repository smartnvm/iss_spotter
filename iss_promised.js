/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const request = require('request-promise-native');


const fetchMyIP = function () {
  // use request to fetch IP address from JSON API
  return request(`https://api.ipify.org?format=json`)
};


const fetchCoordsByIP = function (body) {
  ip = JSON.parse(body).ip
  //console.log(JSON.parse(body))
  return request(`https://freegeoip.app/json/${ip}`)
};



const fetchISSFlyOverTimes = function (body) {
 // console.log(JSON.parse(body))
  const coord = {
    lat: JSON.parse(body).latitude, long: JSON.parse(body).longitude
  }
  console.log(coord)
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coord.lat}&lon=${coord.long}`)

};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};





module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

