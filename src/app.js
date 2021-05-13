// JS for date displaying

let now = new Date();

let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

function showDateTime() {
  let showDate = document.querySelector("#date-time2");
  showDate.innerHTML = `${day} ${month} ${date}, ${year}, ${hour}:${minutes}`;
}

// Search API

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#temperature-description");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let maxTemperatureElement = document.querySelector("#max-temperature");
  let minTemperatureElement = document.querySelector("#min-temperature");
  let currentWeatherIconElement = document.querySelector("#current-weather-icon");
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  maxTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);
  minTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
  currentWeatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentWeatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

// JS for searching locations

function search(city) {
  let apiKey = "c6594087e335e4affb312bbdec8ee13e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Krakow");

let form = document.querySelector("#search-form");
if (form) {
  form.addEventListener('submit', handleSubmit, false);
}





// Geo API - jest okay, czeka na dalsze lekcje

/* function getWeatherForCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c6594087e335e4affb312bbdec8ee13e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  axios.get(`${apiUrl}`).then(showWeather);
}

function getWeatherForCity(city) {
  let apiKey = "c6594087e335e4affb312bbdec8ee13e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
} */

/*
function withoutGeoApi() {
  let currentLocation = "Cracow";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}
*/

// jest okay, czeka na dalsze lekcje

/* function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  let description = document.querySelector("#temperature-description");
  currentTemperature.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
}

function displayGeoApiPrompt() {
  if (!navigator.geolocation) {
    alert ("GeoAPI is not available!");
    getWeatherForCity('Cracow');
  } else {
    navigator.geolocation.getCurrentPosition(getWeatherForCoordinates);
  }
} */
