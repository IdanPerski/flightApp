import {
  addDataToHtmlElement,
  createElementAndAppend,
} from "./addElementToDom.js";

/*__ this class is the result of the user search__ */
export class OneWayUserFlightData {
  #apiPrice;
  #handOfUrl;
  constructor(airline, departureTime, arrivalTime, duration, price, url) {
    this.html = document.createElement("div");
    this.airline = `Airline: ${airline}`;
    this.departureTime = `Deaparture :  ${departureTime}`;
    this.arrivalTime = `Arrival Time: ${arrivalTime}`;
    this.duration = `Duration: ${duration}`;
    this.price = price;
    this.url = url;
  }

  set price(number) {
    this.#apiPrice = number;
  }
  get price() {
    return `price ${Math.floor(this.#apiPrice)} $`;
  }

  set url(apiUrl) {
    this.#handOfUrl = apiUrl;
  }
  get url() {
    return this.#handOfUrl;
  }

  addToDom(parentElement) {
    let arrayOfDeatails = Object.values(this).slice(1);
    arrayOfDeatails.push(this.price);

    // console.log("arrayOfDeatails", arrayOfDeatails);
    arrayOfDeatails.map((deatail) => {
      addDataToHtmlElement(this.html, "li", "", deatail);
      parentElement.appendChild(this.html);
    });

    const link = createElementAndAppend(this.html, "a", "href", this.url);
    const btnUrl = createElementAndAppend(link, "input", "type", "button");

    btnUrl.value = "Order Now!";
    btnUrl.classList.add("btn-outline-info");
    btnUrl.classList.add("btn");
  }
}

export class RoundTripUserFlightData extends OneWayUserFlightData {
  constructor(
    airline,
    departureTime,
    arrivalTime,
    duration,
    price,
    url,
    trip2DepatureTime,
    trip2ArrivalTime
  ) {
    super(airline, departureTime, arrivalTime, duration, price, url),
      (this.trip2DepatureTime = trip2DepatureTime);
    this.trip2ArrivalTime = trip2ArrivalTime;
  }

  set trip2DepatureTime(time) {
    this._departureTime = time;
  }
  set trip2ArrivalTime(time) {
    this._arrivalTime = time;
  }
  set duration(time) {
    this._duration = time;
  }
}

//legs.id= id of one flight ---> example: "HND-LHR:NH203~31:LH902~1:1"

// trips[i].id
// function iterateOverArrayOfObjects(array,keyValye,itemToCompare){
//  let result =false
//    for (const obj of array) {
//     console.log(obj[keyValye]);
//     if (itemToCompare == obj[keyValye]) {
//       result =true
//     }
//   }
//   return result;
// }

// iterateOverArrayOfObjects(legs,id)

/* compareIds()  */
// trips[i].legsId[i]--> if its roundtrip suuposed the arral length has to be = 2
// legIds
// : Array(2)
// 0: "LHR-HND:LH925~19:LH716~19:0"
// 1: "HND-LHR:NH5853~31:LH922~31:1"
// length:2

// trips[i].legsId[i].map(id)=>{
//      if (id== )
// }
