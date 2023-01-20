import finalUserResult from "./userFlightResultSample.js";
import { OneWayUserFlightData, RoundTripUserFlightData } from "./classes.js";
import {
  createElementAndAppend,
  addDataToHtmlElement,
} from "./addElementToDom.js";

let UserFlightDeatails = finalUserResult;

const tripsArray = UserFlightDeatails.trips;
const legs = UserFlightDeatails.legs;
const fares = UserFlightDeatails.fares;

console.log(tripsArray);
console.log(legs);
console.log(fares);

/* find airline name --> using tripObj and legObj*/

function findAirline() {
  UserFlightDeatails.airlines.map((airline) => {
    legs.map((legsObj) => {
      legsObj.airlineCodes.map((airlineCode) => {
        if (airline == airlineCode) {
          console.log(airline.name);
        }
      });
    });
  });
}

// console.log(findAirline());
// console.log(airlines);
// function findAirline() {
//   for (let i = 0; i < airlines.length; i++) {
//     if (airlines[i].code == legsObj.airlineCodes[0]) {
//       return airlines[i].name;
//     }
//   }
// }
