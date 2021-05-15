import _, { toUpper } from "lodash";
import "./style.scss";
import Clock from "./clock.js";
// import { call } from "file-loader";

// Set up clocks.
Clock.initialize();

// Weather
const mainWrapper = document.querySelector(".main-wrapper");
const locationForm = document.querySelector(".location");
const searchMinimalizeToggle = document.querySelector(
  ".search-minimalize-toggle"
);
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

    displayResponse(locationData);
  } catch (error) {
    displayFetchError(error, locationData);
  }
};

// Submit inserted data for ajax call.
locationSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let location = locationInput.value;
  let APIkey = APIkeyInput.value;

  getLocationData(location, APIkey);
});

// "Unminimalize" search form on click.
searchMinimalizeToggle.addEventListener("click", () => {
  locationForm.classList.remove("minimalized");
});

// Show returned data from ajax call.
const displayResponse = (data) => {
  let resultsWrapper;

  // Minimalize search form.
  locationForm.classList.add("minimalized");

  // Creation of results wrapper with received data displayed.
  if (document.querySelector(".results-wrapper")) {
    resultsWrapper = document.querySelector(".results-wrapper");
    resultsWrapper.innerHTML = "";
  } else {
    resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("results-wrapper");
    mainWrapper.appendChild(resultsWrapper);
  }

  // Add returned data.
  const resultsData = document.createElement("div");
  resultsWrapper.appendChild(resultsData);
  resultsData.classList.add("results-data");

  // Display all elements of received weather data.
  displayData(resultsData, data);

  // Add appropriate image as a background.
  const resultsBackgroundImg = document.createElement("img");
  resultsWrapper.appendChild(resultsBackgroundImg);
  resultsBackgroundImg.classList.add("results-bg-img");

  switch (data.weather[0].main) {
    case "Thunderstorm":
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/3933949/pexels-photo-3933949.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Thunderstorm";
      break;
    case "Drizzle":
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Drizzle";
      break;
    case "Rain":
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Rain";
      break;
    case "Snow":
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/1032654/pexels-photo-1032654.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Snow";
      break;
    case "Clear":
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/998660/pexels-photo-998660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Clear";
      break;
    case "Clouds":
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Clouds";
      break;
    default:
      resultsBackgroundImg.src =
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
      resultsBackgroundImg.alt = "Weather";
      break;
  }
};

// Show error message from failed ajax call.
const displayFetchError = (error, response) => {
  console.error(error);
  console.log(error);
  let resultsWrapper;

  if (document.querySelector(".results-wrapper")) {
    resultsWrapper = document.querySelector(".results-wrapper");
    resultsWrapper.innerHTML = "";
  } else {
    resultsWrapper = document.createElement("div");
    resultsWrapper.classList.add("results-wrapper");
    mainWrapper.appendChild(resultsWrapper);
  }

  // Add returned data.
  const resultsError = document.createElement("div");
  resultsWrapper.appendChild(resultsError);
  resultsError.classList.add("results-error");

  // This is how response is received - "404" / 401
  if (response.cod === "404" || response.cod === 401) {
    resultsError.textContent = `Error code: ${response.cod}, Message: ${response.message}`;
  } else {
    resultsError.textContent = error;
  }

  // Add appropriate image as a background.
  const resultsBackgroundImg = document.createElement("img");
  resultsWrapper.appendChild(resultsBackgroundImg);
  resultsBackgroundImg.classList.add("results-bg-img");
  resultsBackgroundImg.src =
    "https://content.instructables.com/ORIG/F3C/UCEC/IMJGA0KG/F3CUCECIMJGA0KG.png?auto=webp&fit=bounds&frame=1";
  resultsBackgroundImg.alt = "Blue screen";
};

// Display all elements of received weather data.
const displayData = (wrapper, data) => {
  // Display city, country code.
  const title = document.createElement("div");
  title.classList.add("title");
  wrapper.appendChild(title);
  title.textContent = `${data.name}, ${data.sys.country}`;

  // Display temperature.
  const temperature = document.createElement("div");
  temperature.classList.add("temperature");
  wrapper.appendChild(temperature);
  const tempC = Math.round((parseInt(data.main.temp, 10) - 273.15) * 100) / 100;
  const tempF =
    Math.round(((parseInt(data.main.temp, 10) - 273.15) * (9 / 5) + 32) * 100) /
    100;
  temperature.textContent = `Temperature: ${tempC}°C / ${tempF}°F`;

  // Display humidity.
  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  wrapper.appendChild(humidity);
  humidity.textContent = `Humidity: ${
    Math.round(data.main.humidity * 100) / 100
  }%`;

  // Display wind speed.
  const windSpeed = document.createElement("div");
  windSpeed.classList.add("wind-speed");
  wrapper.appendChild(windSpeed);
  windSpeed.textContent = `Wind speed: ${data.wind.speed}m/s`;

  // Display description.
  const description = document.createElement("div");
  description.classList.add("description");
  wrapper.appendChild(description);
  description.textContent = `${
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.substring(1)
  }`;

  // Display time.
  const time = document.createElement("div");
  time.classList.add("time");
  wrapper.appendChild(time);

  /*let timeVal = new Date();
  
  timeVal.setHours(timeVal.getHours() + data.timezone / 3600);
  console.log(timeVal.toUTCString());

  timeVal = timeVal.toUTCString().match(/\d{1,2}:\d{2}:\d{2}/i);

  time.textContent = `Local time: ${timeVal}`;*/

  Clock.updateLocalTime(time, data.timezone);
};
