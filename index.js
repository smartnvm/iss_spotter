// index.js

const { nextISSTimesForMyLocation } = require('./iss');



const printPassTime = (passTime) => {

  for (const pass of passTime) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);

    const duration = pass.duration;

    let msg = `Next pass at ${dateTime} for ${duration} seconds!`
    console.log(msg);
    console.log(msg.split("").map(x => "-").join(""))
  }

}


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTime(passTimes);
});
