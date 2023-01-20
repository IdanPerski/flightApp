import finalUserResult from "./userFlightResultSample.js";
import { OneWayUserFlightData, RoundTripUserFlightData } from "./classes.js";
import {
  createElementAndAppend,
  addDataToHtmlElement,
} from "./addElementToDom.js";

function setDateAndTime(date, time) {
  date = date.slice(0, date.indexOf("T"));
  return `${date} ${time}`;
}

// let UserFlightDeatails = finalUserResult;

// const tripsArray = UserFlightDeatails.trips;
// const legs = UserFlightDeatails.legs;
// const fares = UserFlightDeatails.fares;
console.log(finalUserResult);
const { airlines, legs, trips, fares } = finalUserResult;
let userResults = undefined;
console.log(legs, "legs");
console.log(trips, "TRIPS");

for (let i = 0; i < trips.length; i++) {
  const trip = trips[i];
  const { code, id, legIds } = trip;

  legs.map((leg) => {
    const {
      id,
      departureTime,
      departureDateTime,
      arrivalTime,
      arrivalDateTime,
      duration,
    } = leg;

    function findAirline() {
      let results;
      for (let i = 0; i < airlines.length; i++) {
        leg.airlineCodes.find((airlineCode) => {
          if (airlines[i].code == airlineCode) {
            results = airlines[i].name;
          }
        });
      }
      return results;
    }

    if (legIds[0] == id) {
      userResults = new RoundTripUserFlightData(
        findAirline(),
        setDateAndTime(departureDateTime, departureTime),
        setDateAndTime(arrivalDateTime, arrivalTime),
        duration
      );
    }
    if (legIds[1] == id) {
      (userResults.trip2DepatureTime = setDateAndTime(
        departureDateTime,
        departureTime
      )),
        (userResults.trip2ArrivalTime = setDateAndTime(
          arrivalDateTime,
          arrivalTime
        )),
        (userResults.trip2Duration = duration);
    }
  });

  console.log(userResults);
}

// console.log(userResults);
// function findAirline(parmCode) {
//   airlines.find((airline) => {
//     legs.map((leg) => {
//       if (airline.code == parmCode) {
//         console.log(airline.name);
//         return airline.name;
//       }
//     });
//   });
// }
