
const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files

// Call 



const printPassTimes = (passTime) => {

  for (const pass of passTime) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);

    const duration = pass.duration;

    let msg = `Next pass at ${dateTime} for ${duration} seconds!`
    console.log(msg);
    console.log(msg.split("").map(x => "-").join(""))
  }

}


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });