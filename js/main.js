const apiKey = "bb020832999e403691c230345241206";
const apiUrl = "https://api.weatherapi.com/v1/forecast.json?&q=";

const searchBox = document.querySelector(".searcher");

let city = document.querySelector(".location");
let degree = document.querySelector(".num");
let forecastIcon = document.querySelector(".forecast-icon img");
let weatherCondition = document.querySelector(".weather-condition");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");
let windDirection = document.querySelector(".wind-direction");
let dayDisplay = document.querySelector(".day");
let dateDisplay = document.querySelector(".date");

let tomorrow = document.querySelector(".tomorrow");
let tomorrowDegree = document.querySelector(".tomorrow-degree");
let minTomorrowDegree = document.querySelector(".min-tomorrow-degree");
let tomorrowIcon = document.querySelector(".tomorrow-icon img");
let tomorrowCondition = document.querySelector(".tomorrow-condition");

let afterTomorrow = document.querySelector(".after-tomorrow");
let afterDegree = document.querySelector(".after-degree");
let minAfterDegree = document.querySelector(".min-after-degree");
let afterIcon = document.querySelector(".after-icon img");
let afterCondition = document.querySelector(".after-condition");

async function checkWeather(citySearch) {
  try {
    let res = await fetch(apiUrl + citySearch + `&key=${apiKey}&days=3`);
    let weatherData = await res.json();

    displayCurrentWeather(weatherData);
    displayTomorrowWeather(weatherData);
    displayAfterTomorrowWeather(weatherData);
  } catch (e) {
    console.error("Couldn't fetch weather data:", e.message);
  }
}

function displayCurrentWeather(weatherData) {
  city.innerHTML = weatherData.location.name;
  degree.innerHTML = `${weatherData.current.temp_c}°C`;
  forecastIcon.src = "https:" + weatherData.current.condition.icon;
  forecastIcon.alt = weatherData.current.condition.text;
  weatherCondition.innerHTML = weatherData.current.condition.text;
  humidity.innerHTML = weatherData.current.humidity + "%";
  windSpeed.innerHTML = weatherData.current.wind_kph + " km/h";
  windDirection.innerHTML = weatherData.current.wind_dir;

  let currentDay = new Date(weatherData.location.localtime);
  let dayOptions = { weekday: "long" };
  let dateOptions = { day: "numeric", month: "long" };
  dayDisplay.innerHTML = currentDay.toLocaleDateString("en", dayOptions);
  dateDisplay.innerHTML = currentDay.toLocaleDateString("en", dateOptions);
}

function displayTomorrowWeather(weatherData) {
  let tomorrowData = weatherData.forecast.forecastday[1].day;

  let tomorrowDisplay = new Date(weatherData.location.localtime);
  tomorrowDisplay.setDate(tomorrowDisplay.getDate() + 1);
  let tomorrowOptions = { weekday: "long" };
  tomorrow.innerHTML = tomorrowDisplay.toLocaleDateString(
    "en",
    tomorrowOptions
  );

  tomorrowDegree.innerHTML = `${tomorrowData.maxtemp_c}°C`;
  minTomorrowDegree.innerHTML = `${tomorrowData.mintemp_c}°C`;
  tomorrowIcon.src = "https:" + tomorrowData.condition.icon;
  tomorrowIcon.alt = tomorrowData.condition.text;
  tomorrowCondition.innerHTML = tomorrowData.condition.text;
}

function displayAfterTomorrowWeather(weatherData) {
  let afterTomorrowData = weatherData.forecast.forecastday[2].day;

  let afterTomorrowDisplay = new Date(weatherData.location.localtime);
  afterTomorrowDisplay.setDate(afterTomorrowDisplay.getDate() + 2);
  let afterTomorrowOptions = { weekday: "long" };
  afterTomorrow.innerHTML = afterTomorrowDisplay.toLocaleDateString(
    "en",
    afterTomorrowOptions
  );

  afterDegree.innerHTML = `${afterTomorrowData.maxtemp_c}°C`;
  minAfterDegree.innerHTML = `${afterTomorrowData.mintemp_c}°C`;
  afterIcon.src = "https:" + afterTomorrowData.condition.icon;
  afterIcon.alt = afterTomorrowData.condition.text;
  afterCondition.innerHTML = afterTomorrowData.condition.text;
}

async function displayDefaultLocation() {
  try {

    await checkWeather("cairo");

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        async function (position){
          const { latitude, longitude} = position.coords;
          await checkWeather(`${latitude},${longitude}`);
        },
      (e) => {
        console.error("Error getting location", e)
      }
      );
    } else {
      console.error("Geolocation not Supported by this browser");
    }
  } catch (e) {
    console.error("Error displaying location weather", e);
  }
}

window.onload = displayDefaultLocation;

searchBox.addEventListener("keyup", () => {
  checkWeather(searchBox.value);
});
