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
  let date = new Date(response.data.time * 1000);
  currentTemperatureValue.textContent = temperature;
  description.textContent = response.data.condition.description;
  currentHumidity.textContent = `${response.data.temperature.humidity}%`;
  currentWindSpeed.textContent = `${response.data.wind.speed}km/h`;
  weatherEmoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;
  currentDate.innerHTML = showCurrentDate(date);
}

function searchInputCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let currentCity = document.querySelector(".current-city");
  currentCity.textContent = inputCity.value;

  let city = inputCity.value;
  let apiKey = "19fa4a86457804tcabc33b0a088f366o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
  showCurrentTemperature(response);
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
let form = document.querySelector("form");
form.addEventListener("submit", searchInputCity);
