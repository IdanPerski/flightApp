import finalUserResult from "./userFlightResultSample.js";
import { OneWayUserFlightData, RoundTripUserFlightData } from "./classes.js";

function setDateAndTime(date, time) {
  date = date.slice(0, date.indexOf("T"));
  return `${date} ${time}`;
}

console.log(finalUserResult);

/* getting the trip by starting for loop */
function getUserRoundtripDeatails() {
  /* CHANGE IT TO THE PROMISE RESPOND!!! */
  let userResults;
  let userResultsArray = [];
  const { airlines, legs, trips, fares } = finalUserResult;
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
        let result;
        for (let i = 0; i < airlines.length; i++) {
          leg.airlineCodes.find((airlineCode) => {
            if (airlines[i].code == airlineCode) {
              result = airlines[i].name;
            }
          });
        }
        return result;
      }
      switch (legIds.length) {
        case 1 /* at the legsIds the first ID at the array is the first trip */:
          if (legIds[0] == id) {
            userResults = new OneWayUserFlightData(
              findAirline(),
              setDateAndTime(departureDateTime, departureTime),
              setDateAndTime(arrivalDateTime, arrivalTime),
              duration
            );
          }
          break;
        case 2:
          for (let i = 0; i < legs.length; i++) {
            /* have to loop again because legs is the middle of his itreation */

            if (legIds[1] == legs[i].id) {
              userResults = new RoundTripUserFlightData(
                findAirline(),
                setDateAndTime(departureDateTime, departureTime),
                setDateAndTime(arrivalDateTime, arrivalTime),
                duration,
                setDateAndTime(departureDateTime, departureTime),
                setDateAndTime(arrivalDateTime, arrivalTime),
                legs[i].duration
              );
            }
          }
          break;

        default:
          break;
      }
    });
    /* keeping with trip iteraion to get price and URL */

    fares.map((fare) => {
      if (fare.tripId == id) {
        userResults.price = fare.price.totalAmountUsd;
        userResults.url = fare.handoffUrl;
      }
    });

    userResultsArray.push(userResults);
  }
  console.log(userResultsArray);
  return userResultsArray;
}

getUserRoundtripDeatails();
