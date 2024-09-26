function showCurrentTemperature(weatherData) {
  let currentTemperatureValue = document.querySelector(
    "#current-temperature-value"
  );
  let description = document.querySelector("#description");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let weatherEmoji = document.querySelector(".weather-emoji");
  let temperature = Math.round(weatherData.temperature.current);
  let currentDate = document.querySelector(".current-date");
  let currentCity = document.querySelector(".current-city");
  let date = new Date(weatherData.time * 1000);
  currentCity.innerHTML = weatherData.city;
  currentTemperatureValue.textContent = temperature;
  description.textContent = weatherData.condition.description;
  currentHumidity.textContent = `${weatherData.temperature.humidity}%`;
  currentWindSpeed.textContent = `${weatherData.wind.speed}km/h`;
  weatherEmoji.innerHTML = `<img src="${weatherData.condition.icon_url}" class="weather-emoji" />`;
  currentDate.innerHTML = showCurrentDate(date);

  displayForecast(weatherData.city);
}

function showCurrentDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
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

  return `${day},${month} ${hours}:${minutes}`;
}

function displayTemperature(city) {
  let apiKey = "19fa4a86457804tcabc33b0a088f366o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then((response) => {
      const weatherData = response.data;

      showCurrentTemperature(weatherData);
      updateBackground(weatherData);
    })
    .catch((error) => console.log("Error fetching weather data", error));
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
  axios
    .get(apiUrl)
    .then((response) => {
      const weatherData = response.data;

      showWeatherForecast(weatherData);
    })
    .catch((error) => console.log("Error fetching weather data", error));
}

function showWeatherForecast(weatherData) {
  let forecastHtml = " ";

  weatherData.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

     <img class="forecast-icon" src="${day.condition.icon_url}"/>
    <div class="weather-forecast-temperatures>
    <span class="weather-forecast-temperature"><strong class="high">${Math.round(
      day.temperature.maximum
    )}°C</strong></span>
    <span class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}°C</span>
    </div>
    </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

function updateBackground(weatherData) {
  let weatherCondition = weatherData.condition.icon;
  let backgroundImage = " ";

  switch (weatherCondition) {
    case "clear-sky-day":
      backgroundImage = "clear-sky-day.jpg";
      break;
    case "clear-sky-night":
      backgroundImage = "clear-sky-night.jpg";
      break;
    case "few-clouds-day":
      backgroundImage = "few-clouds-day.jpg";
      break;
    case "few-clouds-night":
      backgroundImage = "few-clouds-night.jpg";
      break;
    case "broken-clouds-day":
      backgroundImage = "broken-clouds-day.jpg";
      break;
    case "broken-clouds-night":
      backgroundImage = "broken-clouds-night.jpg";
      break;
    case "scattered-clouds-day":
      backgroundImage = "scattered-clouds-day.jpg";
      break;
    case "scattered-clouds-night":
      backgroundImage = "scattered-clouds-night.jpg";
      break;
    case "snow-day":
      backgroundImage = "snow-day-jpg.jpg";
      break;
    case "snow-night":
      backgroundImage = "snow-night.jpg";
      break;
    case "thunderstorm-day":
      backgroundImage = "thunderstorm-day.jpg";
      break;
    case "thunderstom-night":
      backgroundImage = "thunderstorm-night.jpg";
      break;
    case "mist-day":
      backgroundImage = "mist-day.jpg";
      break;
    case "mist-night":
      backgroundImage = "mist-night.jpg";
      break;
    case "heavy-rain-day":
      backgroundImage = "rainy-day.jpg";
    case "heavy-rain-night":
      backgroundImage = "rainy-night.jpg";
      break;
    case "shower-rain-day":
      backgroundImage = "rainy-day.jpg";
      break;
    case "rainy-night":
      backgroundImage = "rainy-night.jpg";
      break;
    case "light-rain-day":
      backgroundImage = "light-rain-day.jpg";
      break;
    case "light-rain-night":
      backgroundImage = "rainy-night.jpg";
      break;
    case "overcast-clouds-day":
      backgroundImage = "overcast-clouds-day.jpg";
      break;
    case "overcast-clouds-night":
      backgroundImage = "broken-clouds-night.jpg";
      break;
    default:
      backgroundImage = "broken-clouds-day.jpg";
  }
  document.body.style.backgroundImage = `url("images.jpg/${backgroundImage}")`;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);

displayTemperature("Pretoria");
