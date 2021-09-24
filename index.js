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


  fetchCoordsByIP(ip, (error, coord) => {


    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log('Lat:', coord.lat, 'Long:', coord.long);

    fetchISSFlyOverTimes(coord ,(error, body) => {


      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      console.log('Results\n', { body });
    });

  });

});