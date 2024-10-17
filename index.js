function showCurrentTemperature(weatherData, city) {
  let currentTemperatureValue = document.querySelector(
    "#current-temperature-value"
  );
  let description = document.querySelector("#description");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let weatherEmoji = document.querySelector(".weather-emoji");
  let temperature = Math.round(weatherData.temperature.current);
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = weatherData.city;
  currentTemperatureValue.textContent = `${temperature}°c`;
  description.textContent = weatherData.condition.description;
  currentHumidity.textContent = `Humidity: ${weatherData.temperature.humidity}%`;
  currentWindSpeed.textContent = `,Wind: ${weatherData.wind.speed}km/h`;
  weatherEmoji.innerHTML = `<img src="${weatherData.condition.icon_url}" class="weather-emoji" />`;
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

function displayIcon(weatherData) {
  let weatherEmoji = document.querySelector(".weather-emoji");

  weatherEmoji.innerHTML = "";

  switch (weatherData.condition.description) {
    case "clear sky":
      weatherEmoji.innerHTML = `<img src="images.jpg/sun.png" class="sun" />`;
      break;
    case "few clouds":
      weatherEmoji.innerHTML = `<img src="images.jpg/cloud-day-icon.png" class="cloud-sun" />`;
      break;
    case "scattered clouds":
      weatherEmoji.innerHTML = `<img src="images.jpg/cloud-night-icon.png" class="cloudy" />
      <img src="images.jpg/cloud-night-icon.png" class="cloud" />`;
      break;
    case "broken clouds":
      weatherEmoji.innerHTML = `<img src="images.jpg/cloud-night-icon.png" class="cloudy" />
      <img src="images.jpg/cloud-night-icon.png" class="cloud" />`;
      break;
    case "overcast clouds":
      weatherEmoji.innerHTML = `<img src="images.jpg/cloud-night-icon.png" class="cloudy" />
      <img src="images.jpg/cloud-night-icon.png" class="cloud" />`;
      break;
    case "shower rain":
      weatherEmoji.innerHTML = `<img src="images.jpg/rainy-icon.png" class="rain" />`;
      break;
    case "rain":
      weatherEmoji.innerHTML = `<img src="images.jpg/rainy-icon.png" class="rain" />`;
      break;
    case "light rain":
      weatherEmoji.innerHTML = `<img src="images.jpg/rainy-icon.png" class="rain" />`;
      break;
    case "moderate rain":
      weatherEmoji.innerHTML = `<img src="images.jpg/rainy-icon.png" class="rain" />`;
      break;
    case "snow":
      weatherEmoji.innerHTML = `<img src="images.jpg/snow.png" class="snow" />
      <img src="images.jpg/snowing.png" class="snowing" />`;
      break;
    case "thunderstorm":
      weatherEmoji.innerHTML = `<img src="images.jpg/thunderstorm-icon.png" class="storm" />`;
      break;
    case "mist":
      weatherEmoji.innerHTML = `<img src="images.jpg/windy-icon.png" class="mist" />`;
    case "haze":
      weatherEmoji.innerHTML = `<img src="images.jpg/windy-icon.png" class="mist" />`;
      break;
  }
}

function displayTemperature(city) {
  let apiKey = "19fa4a86457804tcabc33b0a088f366o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then((response) => {
      const weatherData = response.data;
      const lat = response.data.coordinates.latitude;
      const lon = response.data.coordinates.longitude;
      const weather = response.data.condition.description;
      const temperature = response.data.temperature.current;

      var marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup(`Weather: ${weather}<br>Temperature: ${temperature} °C`);

      showCurrentTemperature(weatherData);
      updateBackground(weatherData);
      displayCityTime(weatherData);
      displayIcon(weatherData);
    })
    .catch((error) => console.log("Error fetching weather data", error));
}

function showCurrentTime(response) {
  const data = response.data;
  const currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = data.formatted;
}

function displayCityTime(weatherData) {
  const apiKey = " P72WNLIA4S1E";
  const lat = weatherData.coordinates.latitude;
  const lng = weatherData.coordinates.longitude;
  const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
  axios.get(apiUrl).then(showCurrentTime);
}

function searchInputCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  displayTemperature(inputCity.value);
  inputCity.value = " ";
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
    if (index < 7) {
      forecastHtml =
        forecastHtml +
        `<div class="col-3">
        <div class="weather-forecast-day">
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
    </div>
    </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

function updateBackground(weatherData) {
  let currentCity = document.querySelector(".current-city");
  let weatherCondition = weatherData.condition.icon;
  let backgroundImage = " ";

  switch (weatherCondition) {
    case "clear-sky-day":
      backgroundImage = "clear-sky-day.jpg";
      break;
    case "clear-sky-night":
      backgroundImage = "clear-sky-night.jpg";
      document.body.style.color = "white";
      break;
    case "few-clouds-day":
      backgroundImage = "few-clouds-day.jpg";
      break;
    case "few-clouds-night":
      backgroundImage = "few-clouds-night.jpg";
      document.body.style.color = "white";
      break;
    case "broken-clouds-day":
      backgroundImage = "broken-clouds-day.jpg";
      break;
    case "broken-clouds-night":
      backgroundImage = "broken-clouds-night.jpg";
      document.body.style.color = "white";
      currentCity.style.color = "white";
      break;
    case "scattered-clouds-day":
      backgroundImage = "scattered-clouds-day.jpg";
      break;
    case "scattered-clouds-night":
      backgroundImage = "scattered-clouds-night.jpg";
      document.body.style.color = "white";
      currentCity.style.color = "white";
      break;
    case "snow-day":
      backgroundImage = "snow-day-jpg.jpg";
      break;
    case "snow-night":
      backgroundImage = "snow-night.jpg";
      document.body.style.color = "white";
      break;
    case "thunderstorm-day":
      backgroundImage = "thunderstorm-day.jpg";
      break;
    case "thunderstom-night":
      backgroundImage = "thunderstorm-night.jpg";
      document.body.style.color = "white";
      break;
    case "mist-day":
      backgroundImage = "mist-day.jpg";
      break;
    case "mist-night":
      backgroundImage = "mist-night.jpg";
      document.body.style.color = "white";
      break;
    case "heavy-rain-day":
      backgroundImage = "rainy-day.jpg";
    case "heavy-rain-night":
      backgroundImage = "rainy-night.jpg";
      document.body.style.color = "white";
      break;
    case "shower-rain-day":
      backgroundImage = "rainy-day.jpg";
      break;
    case "rainy-night":
      backgroundImage = "rainy-night.jpg";
      document.body.style.color = "white";
      break;
    case "light-rain-day":
      backgroundImage = "light-rain-day.jpg";
      break;
    case "light-rain-night":
      backgroundImage = "rainy-night.jpg";
      document.body.style.color = "white";
      break;
    case "overcast-clouds-day":
      backgroundImage = "overcast-clouds-day.jpg";
      break;
    case "overcast-clouds-night":
      backgroundImage = "broken-clouds-night.jpg";
      document.body.style.color = "white";
      break;
    default:
      backgroundImage = "broken-clouds-day.jpg";
  }
  document.body.style.backgroundImage = `url("images.jpg/${backgroundImage}")`;
}

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS popup.<br> Easily customizable.")
  .openPopup();

map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("You are within" + " " + radius + " " + "meters from this point")
    .openPopup();
  L.circle(e.latlng, radius).addTo(map);
}
map.on("locationfound", onLocationFound);

function hideSidebar() {
  let sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "none";
}
let closeIcon = document.querySelector(".close-icon");
closeIcon.addEventListener("click", hideSidebar);

function showSidebar() {
  let sideBar = document.querySelector(".sidebar");
  sideBar.style.display = "block";
}
let menuIcon = document.querySelector(".menu-icon");
menuIcon.addEventListener("click", showSidebar);

let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);

displayTemperature();
