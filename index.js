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
  const latitude = weatherData.coordinates.latitude;
  const longitude = weatherData.coordinates.longitude;

  const times = SunCalc.getTimes(new Date(), latitude, longitude);
  let sunrise = times.sunrise;
  let sunset = times.sunset;

  isDaytime = sunrise;

  let weatherCondition = weatherData.condition.description;
  let backgroundImage = " ";

  switch (weatherCondition) {
    case "clear sky":
      backgroundImage = isDaytime ? "clear-sky-day.jpg" : "clear-sky-night.jpg";
      break;
    case "few clouds":
      backgroundImage = isDaytime
        ? "few-clouds-day.jpg"
        : "few-clouds-night.jpg";
      break;
    case "broken clouds":
      backgroundImage = isDaytime
        ? "broken-clouds-day.jpg"
        : "broken-clouds-night.jpg";
      break;
    case "scattered clouds":
      backgroundImage = isDaytime
        ? "scattered-clouds-day.jpg"
        : "scattered-clouds-night.jpg";
      break;
    case "snow":
      backgroundImage = isDaytime ? "snow-day-jpg.jpg" : "snow-night.jpg";
      break;
    case "thunderstorm":
      backgroundImage = isDaytime
        ? "thunderstorm-day.jpg"
        : "thunderstorm-night.jpg";
      break;
    case "thunderstom with heavy rain":
      backgroundImage = isDaytime
        ? "thunderstorm-day.jpg"
        : "thunderstom-night.jpg";
      break;
    case "haze":
      backgroundImage = isDaytime ? "mist-day.jpg" : "mist-night.jpg";
      break;
    case "mist":
      backgroundImage = isDaytime ? "mist-day.jpg" : "mist-night.jpg";
      break;
    case "heavy rain":
      backgroundImage = isDaytime ? "rainy-day.jpg" : "rainy-night.jpg";
      break;
    case "shower rain":
      backgroundImage = isDaytime ? "rainy-day.jpg" : "rainy-night.jpg";
      break;
    case "light rain":
      backgroundImage = isDaytime ? "light-rain-day.jpg" : "rainy-night.jpg";
      break;
    case "overcast clouds":
      backgroundImage = isDaytime
        ? "overcast-clouds-day.jpg"
        : "broken-clouds-night.jpg";
      break;
    default:
      backgroundImage = isDaytime ? "broken clouds" : "clear-sky-night.jpg";
  }
  document.body.style.backgroundImage = `url("images.jpg/${backgroundImage}")`;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);

displayTemperature("Pretoria");
