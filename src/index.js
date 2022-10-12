function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = ` ${searchInput.value}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let h2 = document.querySelector("h2");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day}  ${hours}:${minutes} `;

function toFahren(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = 66;
}

function toCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#main-temperature");
  mainTemperature.innerHTML = 19;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);

let fahrenLink = document.querySelector("#fahren-link");
fahrenLink.addEventListener("click", toFahren);

function currentPosition(response) {
  let currentCity = document.querySelector("#main-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${temperature.value}`;
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1df980409369f626875a35fbee109a22";
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(currentPosition);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-temp");
button.addEventListener("click", getCurrentPosition);

function searchEngine(event) {
  event.preventDefault();
  let apiKey = "1df980409369f626875a35fbee109a22";
  let city = document.querySelector("#search-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(currentWeather);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchEngine);

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureInfo = document.querySelector("h1");
  temperatureInfo.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#main-temperature");
  temp.innerHTML = `${temperature}`;
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
}

function displayPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1df980409369f626875a35fbee109a22";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", current);
