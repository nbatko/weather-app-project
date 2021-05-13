// JS for date displaying

let now = new Date();

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
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



// JS for searching locations

// function searchCity(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#inlineFormInputGroupUsername2");

//   let h1 = document.querySelector("h1");
//   if (searchInput.value) {
//     h1.innerHTML = `${searchInput.value}`;
//   } else {
//     h1.innerHTML = `Weather for a city`;
//     alert("Please, type the city");
//   }
// }

// let searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("submit", searchCity);

// JS for changing temperature F -> C

////////////////////////////////////////////////////
/*
function changeToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 11 + "℃";
}
let celsiusTemperature = document.querySelector("#celsius-temperature");
celsiusTemperature.addEventListener("click", changeToCelsius);
//  JS for changing temperature C -> F
function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 1.8 * 11 + 32 + "°F";
}
let fahrenheitTemperature = document.querySelector("#fahrenheit-temperature");
fahrenheitTemperature.addEventListener("click", changeToFahrenheit);
// Weather API
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
function searchCity(event) {
  event.preventDefault();
  //let searchInput = document.querySelector("#inlineFormInputGroupUsername2");
  let city = document.querySelector("#inlineFormInputGroupUsername2").value;
  let cityName = document.querySelector("h1");
  if (city) {
    cityName.innerHTML = `${city}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(showTemperature);
  } else {
    cityName.innerHTML = `Weather for a city`;
    alert("Please, type the city");
  }
}
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  let description = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
}
//axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
//axios.get(`${apiUrl}`);
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let apiKey = "c6594087e335e4affb312bbdec8ee13e";

// Search API

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#temperature-description");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let maxTemperatureElement = document.querySelector("#max-temperature");
  let minTemperatureElement = document.querySelector("#min-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  maxTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);
  minTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Zakopane&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);


// Geo API - jest okay, czeka na dalsze lekcje
/*
function getWeatherForCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  axios.get(`${apiUrl}`).then(showWeather);
}


function getWeatherForCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}
*/


/*
function withoutGeoApi() {
  let currentLocation = "Cracow";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}
*/

// jest okay, czeka na dalsze lekcje

/*
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
*/