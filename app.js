import { OneWayUserFlightData, RoundTripUserFlightData } from "./classes.js";
import {
  createElementAndAppend,
  addDataToHtmlElement,
} from "./addElementToDom.js";

import { getUserRoundSearchDeatails } from "./myFunctions.js";

const apiKey = "63c597d33533e412b5b2e407";

/* buttons */
const chooseTypedCityBtn = document.querySelector("#choose-typedCity-btn");
const chooseDestenationBtn = document.querySelector("#choose-destenation-btn");

/* selects tag */
const airPortFrom = document.querySelector("#select-airport");
const airPortDestenation = document.querySelector("#select-dest");
/* ________________________"Choose from" button________________________________________ */
chooseTypedCityBtn.addEventListener("click", () => {
  /* input vlaue */
  const inputCityFrom = document.querySelector("#choose-city-input").value;
  if (inputCityFrom == "") {
    console.log("no input value");
    return;
  }
  getCityAirPorts(inputCityFrom, airPortFrom);
  const undisplayedDiv = document.querySelector("#undisplayed-div");
  undisplayedDiv.classList.remove("d-none");
});
/* _______________"Choose destenation" button_________________ */
chooseDestenationBtn.addEventListener("click", () => {
  /* input vlaue */
  const inputCityDest = document.querySelector(
    "#choose-destenation-input"
  ).value;

  if (inputCityDest == "") {
    console.log("no input value");
    return;
  }
  console.log("button clicked- getCityAirPorts function is ON!");
  getCityAirPorts(inputCityDest, airPortDestenation);
});
/* _________________________find flight button__________________________________________ */
const findBtn = document.querySelector("#findBtn");
findBtn.addEventListener("click", () => {
  /* collecting user data */
  const selectedFrom = document.querySelector("#select-airport").value;
  const selectedDest = document.querySelector("#select-dest").value;
  const dateInput = document.querySelector("#date-input").value;
  const dateInput2 = document.querySelector("#date-input2").value;
  /* radioButtons */
  const radioButtons = document.querySelectorAll('input[name="btnRadio"]');
  let trip = () => {
    for (const radioBtn of radioButtons) {
      if (radioBtn.checked) {
        return radioBtn.id;
      }
    }
  };

  /* send user data to API */
  function sendUserData() {
    // const apiKey = "63c597d33533e412b5b2e407";
    const oneWayurlReq = `https://api.flightapi.io/${trip()}/${apiKey}/${selectedFrom}/${selectedDest}/${dateInput}/1/0/0/Economy/USD`;

    const roundTripurlReq = `https://api.flightapi.io/${trip()}/${apiKey}/${selectedFrom}/${selectedDest}/${dateInput}/${dateInput2}/1/0/0/Economy/USD`;

    let urlReq = "";
    switch (trip()) {
      case "onewaytrip":
        urlReq = oneWayurlReq;

        break;
      case "roundtrip":
        urlReq = roundTripurlReq;
        break;
    }
    console.log(urlReq);
    return urlReq;
  }
  /* user flights Promise */
  const userFlights = new Promise((resolve, reject) => {
    const findFlight = new XMLHttpRequest();

    findFlight.open("GET", sendUserData());

    findFlight.onload = () => {
      if (findFlight.status == 200) {
        resolve(findFlight.response);
      } else {
        reject(findFlight.status);
      }
    };
    findFlight.send();
  });

  userFlights
    .then((respond) => {
      const UserFlightDeatails = JSON.parse(respond);
      getUserRoundSearchDeatails(UserFlightDeatails);
      /* ________displaying results_________ */
      const displayResults = document.querySelector("#user-result-display");
      userResultsArray.map((obj) => {
        obj.addToDom(displayResults);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* _____display dates___ */
const roundTrip = document.querySelector("#roundtrip");
roundTrip.addEventListener("click", () => {
  document.querySelector("#date-div2").classList.remove("d-none");
});

const oneWay = document.querySelector("#onewaytrip");
oneWay.addEventListener("click", () => {
  document.querySelector("#date-div2").classList.add("d-none");
});

/* __________Promise Function for getting airpots list_________ */
function getCityAirPorts(inputToType, appendTo) {
  /* appendTo is the element that will contain the data */
  const CityAirportsPromise = new Promise((resolve, reject) => {
    const flightHttp = new XMLHttpRequest();
    // const apiKey = "63c597d33533e412b5b2e407";
    console.log(apiKey);
    flightHttp.open(
      "GET",
      `https://api.flightapi.io/iata/${apiKey}/?name=${inputToType}&type=airport`
    );

    flightHttp.onload = () => {
      console.log(flightHttp.status);
      if (flightHttp.status == 200) {
        resolve(JSON.parse(flightHttp.response).data);
      } else {
        reject(flightHttp.status);
      }
    };
    flightHttp.send();
  });
  CityAirportsPromise.then((result) => {
    /* 'cleaning' the HTML elemet before filling it up with data */
    appendTo.innerHTML = null;
    result.map((value) => {
      createElementAndAppend(
        appendTo,
        "option",
        "value",
        value.iata
      ).innerHTML = `${value.iata} <span>${value.name}</span> `;
    });
  }).catch((error) => {
    const displayResults = document.querySelector("#user-result-display");
    createElementAndAppend(
      displayResults,
      "div",
      "id",
      "error-message"
    ).innerText = `error status ${error}`;
    console.log(error);
  });
}

/* find Dates and time  from the API object */
function setDateAndTime(date, time) {
  date = date.slice(0, date.indexOf("T"));
  return `${date} ${time}`;
}
