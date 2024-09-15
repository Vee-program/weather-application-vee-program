function showCurrentTemperature(response) {
  let currentTemperatureValue = document.querySelector(
    "#current-temperature-value"
  );
  let description = document.querySelector("#description");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let weatherEmoji = document.querySelector(".weather-emoji");
  let temperature = Math.round(response.data.temperature.current);
  let currentDate = document.querySelector(".current-date");
  let currentCity = document.querySelector(".current-city");
  let date = new Date(response.data.time * 1000);
  currentCity.innerHTML = response.data.city;
  currentTemperatureValue.textContent = temperature;
  description.textContent = response.data.condition.description;
  currentHumidity.textContent = `${response.data.temperature.humidity}%`;
  currentWindSpeed.textContent = `${response.data.wind.speed}km/h`;
  weatherEmoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;
  currentDate.innerHTML = showCurrentDate(date);

  displayForecast(response.data.city);
}

function showCurrentDate(date) {
  let currentDate = document.querySelector(".current-date");
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
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
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}

function displayTemperature(city) {
  let apiKey = "19fa4a86457804tcabc33b0a088f366o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function searchInputCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  displayTemperature(inputCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(city) {
  let apiKey = "19fa4a86457804tcabc33b0a088f366o";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showWeatherForecast(response) {
  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
     <div class="weather-forecast-date">${formatDay(day.time)}</div>
     <div class="weather-forecast-icon"><img src="${
       day.condition.icon_url
     }"</div>
    <div class="weather-forecast-temperatures>
    <div class="weather-forecast-temperature"><strong>${Math.round(
      day.temperature.minimum
    )}</strong></div>
    <div class="weather-forecast-temperature"><strong>${Math.round(
      day.temperature.maximum
    )}</strong></div>
    </div>
    </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}
console.error();

let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);

displayTemperature("Paris");
