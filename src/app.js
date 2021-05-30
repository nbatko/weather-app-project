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

// JS for forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

/* function formatDate(timestamp) {
  let dtDate = new Date(timestamp * 1000);
  let day = dtDate.getDate();
  let month = dtDate.getMonth();
  return day;
} */

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
    forecastHTML = forecastHTML + `<div class="col" id="weather-forecast">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h5 class="card-title"><strong>${formatDay(forecastDay.dt)}</strong></h5>
            <p class="date">Date</p>
          </div>
        </div>
        <div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="weather icon" class="forecast-weather-icon" id="forecast-weather-icon">
        </div>
        <p class="card-text">${Math.round(forecastDay.temp.day)}°C</p>
        <p class="weather-description">${forecastDay.weather[0].description}</p>
      </div>
    </div>
  </div>`;
  }
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

// Search API and forecast API

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);

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
let apiKey = "c6594087e335e4affb312bbdec8ee13e";

search("kraków");

// Geo API - jest okay, czeka na dalsze lekcje

 function getWeatherForCoordinates(position) {
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
}


function withoutGeoApi() {
  let currentLocation = "Cracow";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}


// jest okay, czeka na dalsze lekcje

function showWeather(response) {
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
}