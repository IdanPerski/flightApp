import finalUserResult from "./userFlightResultSample.js";
import { OneWayUserFlightData, RoundTripUserFlightData } from "./classes.js";

function setDateAndTime(date, time) {
  date = date.slice(0, date.indexOf("T"));
  return `${date} ${time}`;
}

// console.log(finalUserResult);

/* getting the trip by starting for loop */
export function getUserRoundSearchDeatails(apiObjectDestruction) {
  /* CHANGE IT TO THE PROMISE RESPOND!!! */
  let userResults;
  let userResultsArray = [];
  const { airlines, legs, trips, fares } = apiObjectDestruction;
  for (let i = 0; i < trips.length; i++) {
    const trip = trips[i];
    const { legIds } = trip;

    legs.map((leg) => {
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
      const {
        id,
        departureTime,
        departureDateTime,
        arrivalTime,
        arrivalDateTime,
        duration,
      } = leg;
      switch (legIds.length) {
        case 1:
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
          if (legIds[1] == id) {
            userResults = new RoundTripUserFlightData(
              findAirline(),
              setDateAndTime(departureDateTime, departureTime),
              setDateAndTime(arrivalDateTime, arrivalTime),
              duration
            );

            for (let i = 0; i < legs.length; i++) {
              userResults.trip2DepatureTime = setDateAndTime(
                legs[i].departureDateTime,
                legs[i].departureTime
              );
              userResults.trip2ArrivalTime = setDateAndTime(
                legs[i].arrivalDateTime,
                legs[i].arrivalTime
              );
              userResults.trip2Duration = legs[i].duration;
            }
          }
          break;
      }
    });
    /* keeping with trip iteraion to get price and URL */
    fares.map((fare) => {
      if (fare.tripId == trip.id) {
        userResults.price = fare.price.totalAmountUsd;
        userResults.url = fare.handoffUrl;
      }
    });
    // console.log(userResults);
    userResultsArray.push(userResults);
  }

  //   console.log(userResultsArray);
  return userResultsArray;
}

// getUserRoundSearchDeatails(finalUserResult);
