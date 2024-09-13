function searchInputCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let currentCity = document.querySelector(".current-city");
  let city = inputCity.value;
  currentCity.textContent = `${city}`;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);

function search() {
  let apiKey = "19fa4a86457804tcabc33b0a088f366o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
}

function showCurrentTemperature() {
  let currentTemperatureValue = document.querySelector(
    "#current-temperature-value"
  );
}
let description = document.querySelector("#description");
let currentHudity = document.querySelector("#current-humidity");
let currentWindSpeed = document.querySelector("current-wind-speed");
let currentDate = document.querySelector(".current-date");
