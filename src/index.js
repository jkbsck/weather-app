import _ from "lodash";
import "./style.scss";
import Clock from "./clock.js";
// import { call } from "file-loader";

// Set up clocks.
Clock.initialize();

// Weather
const mainWrapper = document.querySelector(".main-wrapper");
const locationInput = document.getElementById("location");
const APIkeyInput = document.getElementById("api-key");
const locationSubmit = document.getElementById("location-submit");
let locationData;

// Request data from openweathermap.org with given location and API key.
const getLocationData = async (location, APIkey) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`,
      { mode: "cors" }
    );

    locationData = await response.json();

    if (locationData.cod === "404") {
      throw new Error(
        `Error code: ${locationData.cod}, Message: ${locationData.message}`
      );
    }

    displayResponse(locationData);
  } catch (error) {
    displayFetchError(error);
  }
};

// Submit inserted data for ajax call.
locationSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let location = locationInput.value;
  let APIkey = APIkeyInput.value;

  getLocationData(location, APIkey);
});

// Show returned data from ajax call.
const displayResponse = (data) => {
  let resultsWrapper;

  if (document.querySelector(".results-wrapper")) {
    resultsWrapper = document.querySelector(".results-wrapper");
    resultsWrapper.innerHTML = "";
  } else {
    resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("results-wrapper");
    mainWrapper.appendChild(resultsWrapper);
  }

  resultsWrapper.textContent = `${data.name}, ${data.sys.country} - temperature: ${data.main.temp} K, humidity: ${data.main.humidity} %, speed of wind: ${data.wind.speed} m/s, description: ${data.weather[0].description}`;
};

// Show error message from failed ajax call.
const displayFetchError = (error) => {
  console.error(error.name);
  let resultsWrapper;

  if (document.querySelector(".results-wrapper")) {
    resultsWrapper = document.querySelector(".results-wrapper");
    resultsWrapper.innerHTML = "";
  } else {
    resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("results-wrapper");
    mainWrapper.appendChild(resultsWrapper);
  }

  resultsWrapper.textContent = error.message;
};
