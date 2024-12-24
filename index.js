"use strict";

const apiKey = "1bf1e45a09917f71ad310b8f2b4c6043";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  
    if(data.weather[0].main == "Clouds") {
  weatherIcon.src = "images/weather-few-clouds.256x256.png";
    }
    else if(data.weather[0].main == "Clear") {
      weatherIcon.src = "images/weather-clear-symbolic.256x256.png";
    }
    else if(data.weather[0].main == "Rain") {
      weatherIcon.src = "images/cloud-with-lightning-and-rain.240x256.png";
    }
    else if(data.weather[0].main == "Snow") {
      weatherIcon.src = "images/cloud-with-snow.256x256.png";
    }
    else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/overcast-day-drizzle.256x217.png";
    }
    else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/fog.256x220.png";
    }
  
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
  }
  }

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
