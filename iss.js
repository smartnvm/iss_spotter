/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  let domain = 'https://api.ipify.org?format=json';

  request(domain, (error, response, body) => {

    if (error) return callback(`\n ERROR: ${error.message}`, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);

    }

    //you can fetch IP also by response.body
    const ip = JSON.parse(body).ip;
    callback(null, ip); 
  });

};



const fetchCoordsByIP = function (ip, callback) {
  // use request to fetch IP address from JSON API
  let domain = `https://freegeoip.app/json/${ip}`;

  request(domain, (error, response, body) => {

    if (error) return callback(`\n ERROR: ${error.message}`, null, null);

    if (response.statusCode !== 200) {
      const errMsg = console.log(`Status Code ${response && response.statusCode} when fetching URL: ${domain}`);
      callback(errMsg, null, null);
      return;
    }


    //you can fetch IP also by response.body
    //  const ip = JSON.parse(body).ip
    const coord = {
      lat: JSON.parse(body).latitude,
      long: JSON.parse(body).longitude
    }

    callback(null, coord);

  });

};


const fetchISSFlyOverTimes = function (coord, callback) {
  // use request to fetch IP address from JSON API


  let domain = `https://iss-pass.herokuapp.com/json/?lat=${coord.lat}&lon=${coord.long}`;

  request(domain, (error, response, body) => {

    if (error) return callback(`\n ERROR: ${error.message}`, null, null);

    if (response.statusCode !== 200) {
      const errMsg = console.log(`Status Code ${response && response.statusCode} when fetching URL: ${domain}`);
      callback(errMsg, null, null);
      return;
    }


    //you can fetch IP also by response.body
    //  const ip = JSON.parse(body).ip
    // const lat = JSON.parse(body).latitude;
    // const long = JSON.parse(body).longitude;
    const passTimesArr = JSON.parse(body).response
    callback(null, passTimesArr);

  });

};




const nextISSTimesForMyLocation = function (callback) {

  fetchMyIP((error, ip) => {

    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        return callback(error, null);
      }


      fetchISSFlyOverTimes(coord, (error, nextPass) => {

        if (error) {
          return callback(error, null);
        }
        
         callback(null, nextPass)

      })


    });

  });

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

