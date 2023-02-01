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

  displayInTable(parentElement) {
    let table = document.createElement("table");
    let tHead = table.createTHead();

    let filThead = Object.keys(this).slice(1);

    filThead.map((tableHeadText) => {
      const headRow = tHead.insertRow();
      headRow.insertCell().innerText = tableHeadText;
    });

    parentElement.appendChild(table);
  }
}

export class RoundTripUserFlightData extends OneWayUserFlightData {
  constructor(
    airline,
    departureTime,
    arrivalTime,
    duration,
    trip2DepatureTime,
    trip2ArrivalTime,
    trip2Duration,
    trip2airline
  ) {
    super(airline, departureTime, arrivalTime, duration);

    this.trip2DepatureTime = trip2DepatureTime;
    this.trip2ArrivalTime = trip2ArrivalTime;
    this.trip2Duration = trip2Duration;
    this.trip2airline = trip2airline;
  }

  set trip2DepatureTime(time) {
    this._trip2DepatureTime = `Deaparture : ${time}`;
  }
  set trip2ArrivalTime(time) {
    this._trip2ArrivalTime = `Arrival Time: ${time}`;
  }
  set _trip2Duration(time) {
    this._trip2Duration = `Duration: ${time}`;
  }
  set _trip2airline(airline) {
    this.trip2airline = `Airline: ${airline}`;
  }
}

export class UserResultTable {
  constructor(tHeadCellsArray) {
    this.html = document.createElement("table");
    this.tHeadCells = tHeadCellsArray;
  }

  tableCells() {
    const table = this.html;
    table.classList.add("table");
    const thead = table.createTHead();
    const headRow = thead.insertRow();
    insertCells(headRow, tHeadCellsArray.length, this.tHeadCells);
    const tbody = table.createTBody();
    console.log(table);

    return table;
  }

  createRows(table, data1, data2) {
    let maxLength = Math.max(data1.length, data2.length);
    for (let i = 0; i < maxLength; i++) {
      let row = table.insertRow();
      let cell1 = row.insertCell();
      let cell2 = row.insertCell();
      cell1.innerHTML = data1[i] || "";
      cell2.innerHTML = data2[i] || "";
    }
  }

  insertCells(row, numCells, data) {
    for (let i = 0; i < numCells; i++) {
      let cell = row.insertCell();
      cell.innerHTML = data[i];
    }
  }

  fillColumn(table, columnIndex, data) {
    let rows = table.rows;
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      let cell = rows[i].insertCell(columnIndex);
      cell.innerHTML = data[i];
    }
  }
}
