import finalUserResult from "./userFlightResultSample.js";
import { OneWayUserFlightData, RoundTripUserFlightData } from "./classes.js";

function setDateAndTime(date, time) {
  date = date.slice(0, date.indexOf("T"));
  return `${date} ${time}`;
}

console.log(finalUserResult);

/* getting the trip by starting for loop */
export function getUserRoundtripDeatails() {
  /* CHANGE IT TO THE PROMISE RESPOND!!! */
  let userResults;
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
      /* at the legsIds the first ID at the array is the first trip */
      if (legIds[0] == id) {
        userResults = new OneWayUserFlightData(
          findAirline(),
          setDateAndTime(departureDateTime, departureTime),
          setDateAndTime(arrivalDateTime, arrivalTime),
          duration
        );
      }
      /* the second item at the array is the second trip */
      if (legIds[1] == id) {
        let roundTripUserResults = new RoundTripUserFlightData();
        //moveing a key-value from one object to another
        roundTripUserResults = { ...userResults };
        userResults = roundTripUserResults;

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
    /* keeping with tripObj iteraion to get price and URL */

    fares.map((fare) => {
      if (fare.tripId == id) {
        userResults.price = fare.price.totalAmountUsd;
        userResults.url = fare.handoffUrl;
      }
    });
  }
}

getUserRoundtripDeatails();
