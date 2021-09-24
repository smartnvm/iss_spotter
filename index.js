// index.js
const { fetchMyIP, 
  fetchCoordsByIP, 
  fetchISSFlyOverTimes } = require('./iss');





fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! \nReturned IP:', ip);


  fetchCoordsByIP(ip, (error, lat, lon) => {


    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log('Lat:', lat, 'Long:', lon);

    fetchISSFlyOverTimes(lat, lon, (error, body) => {


      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      console.log('Results\n', { body });
    });

  });

});