// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');





fetchMyIP((error, ip) => {
  
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! \nReturned IP:' , ip);


});
 

fetchCoordsByIP('135.23.201.52', (error, lat, lon) => {
 

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('Lat:', lat, 'Long:' , lon);
});

