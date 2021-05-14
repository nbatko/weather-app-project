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
  let feelsLikeTemperatureElement = document.querySelector("#feels-like-temperature");
  let currentWeatherIconElement = document.querySelector("#current-weather-icon");
  
  celsiusTemperature = response.data.main.temp;
  celsiusFeelsLikeTemperature = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(celsiusTemperature) + celsiusSymbol;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  feelsLikeTemperatureElement.innerHTML = Math.round(response.data.main.feels_like) + celsiusSymbol;
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

let form = document.querySelector("#search-form");
if (form) {
  form.addEventListener('submit', handleSubmit, false);
}

// Temperature conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let feelsLikeTemperatureElement = document.querySelector("#feels-like-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
  let fahrenheitFeelsLikeTemperature = (celsiusFeelsLikeTemperature * 9 / 5) + 32;
  let fahrenheitSymbol = "°F";
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + fahrenheitSymbol;
  feelsLikeTemperatureElement.innerHTML = Math.round(fahrenheitFeelsLikeTemperature) + fahrenheitSymbol;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let feelsLikeTemperatureElement = document.querySelector("#feels-like-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + celsiusSymbol;
  feelsLikeTemperatureElement.innerHTML = Math.round(celsiusFeelsLikeTemperature) + celsiusSymbol;
}

let celsiusTemperature = null;
let celsiusFeelsLikeTemperature = null;
let celsiusSymbol = "°C";

let fahrenheitClick = document.querySelector("#fahrenheit-temperature");
fahrenheitClick.addEventListener("click", displayFahrenheitTemperature);

let celsiusClick = document.querySelector("#celsius-temperature");
celsiusClick.addEventListener("click", displayCelsiusTemperature);

search("Kraków");

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
