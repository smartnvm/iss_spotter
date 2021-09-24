/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

let domain = 'https://api.ipify.org?format=json'

const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API


  request(domain, (error, response, body) => {

    if (error) return callback(`\n ERROR: ${error.message}`, null)

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null)

    }

    //you can fetch IP also by response.body
    const ip = JSON.parse(body).ip
    callback(null, ip) // Print the HTML for the Google homepage.

  })

}



const fetchCoordsByIP = function (ip, callback) {
  // use request to fetch IP address from JSON API
  

  request('https://freegeoip.app/json/' + ip, (error, response, body) => {

    if (error) return callback(`\n ERROR: ${error.message}`, null)

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null)

    }

    //you can fetch IP also by response.body
    //  const ip = JSON.parse(body).ip
    const lat = JSON.parse(body).latitude
    const long = JSON.parse(body).longitude

    callback(null, lat, long)

  })

}



module.exports = { fetchMyIP, fetchCoordsByIP };

