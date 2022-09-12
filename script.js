// Variables used for search and search history functions
const apiKey = "554f6e2a0ea6794e7db1dd1d10c95025";
const searchCityEl = document.querySelector("#locationsearchinput");
var searchInput = document.querySelector("#locationsearchinput").value.trim();
const searchFormEl = document.querySelector("#searchform");
const searchCityButton = document.querySelector("#searchbtn");
const resultTextEl = document.querySelector("#result-text");
const currentForecastEl = document.querySelector("#current-forecast");
// Variables to append new elements to
const currentWeatherEl = document.querySelector("#current-weather");
const fiveDayEl = document.querySelector("#five-day-forecast");
const searchHistoryEl = document.querySelector("#search-history");
const pastSearchButton = document.createElement("button");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  // Variable to store city text input as parameter used in API url
  var searchInput = document.querySelector("#locationsearchinput").value.trim();

  // If conditional statement to console an error if empty text input is submitted
  if (!searchInput) {
    console.error("Please enter a City");
    return;
  }
  searchFormEl.reset();
  getWeather(searchInput);
}

function getWeather(searchInput) {
  const apiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchInput +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(apiURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
    

      // Variables to define coordinates and fetch request UV Data from UV API URL
      const lat = data.city.coord.lat;
      const lon = data.city.coord.lon;
      const uvApiURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

      fetch(uvApiURL)
        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }
          return response.json();
        })
        .then(function (uvData) {
          // console.log(uvData)
          displayCurrentWeather(data, uvData);
        });
    });
}

// function to append current weather data to create and append text and weather icon to current weather body element
function displayCurrentWeather(data, uvData) {

  const resultName = currentWeatherEl.children[0];
  // Adds city name and uses moment.js to display current date
  resultName.textContent = "Showing weather for: " + data.city.name + " " + moment().format("M/D/YYYY");


  const resultIcon = currentWeatherEl.children[1];
  resultIcon.src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
  
  const resultTemp = currentWeatherEl.children[2];
  resultTemp.textContent = "Temperature: " + data.list[0].main.temp.toFixed(1) + "\u2109";

  const resultWind = currentWeatherEl.children[3];
  resultWind.textContent = "Wind Speed: " + data.list[0].wind.speed.toFixed(1) + " MPH";

  const resultHumidity = currentWeatherEl.children[4];
  resultHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";


  const resultUV = currentWeatherEl.children[5];
  resultUV.classList.add("rounded", "btn-sm");
  resultUV.classList.remove("d-none");
  resultUV.textContent = "UV Index: " + uvData.value;


  // If conditional statement to color code UV Index based on index number
  if (uvData.value < 3) {
    resultUV.classList.add("text-light", "bg-success", "p-2");
  } else if (uvData.value < 7) {
    resultUV.classList.add("text-light", "bg-warning", "p-2");
  } else {
    resultUV.classList.add("text-light", "bg-danger", "p-2");
  }
  
  for (let i = 0; i < 5; i++) {
    displayFiveDay(i);
  }

 // function to fetch data and depict a five day forecast
  function displayFiveDay(i) {
    var fiveDayDate = moment(data.list[i * 8].dt * 1000).format("dddd M/D");
    var fiveDayIcon = "http://openweathermap.org/img/wn/" + data.list[i * 8].weather[0].icon + "@2x.png";
    var fiveDayTemp = data.list[i * 8].main.temp.toFixed(1) + "\u2109";
    var fiveDayHumidity = data.list[i * 8].main.humidity + "% ";

    let forecastDayEl = document.querySelector(`#day-${i}`);
    forecastDayEl.classList.add("bg-info", "rounded");
    forecastDayEl.children[0].textContent = fiveDayDate;
    forecastDayEl.children[1].src = fiveDayIcon;
    forecastDayEl.children[2].textContent = "Temperature: " + fiveDayTemp;
    forecastDayEl.children[3].textContent = "Humidity: " + fiveDayHumidity;
  
  }
  displaySearchHistory(data);
}

function displaySearchHistory(data) {
  const pastSearchButton = document.createElement("button");
  pastSearchButton.classList.add("btn", "btn-secondary", "m-2");
  pastSearchButton.textContent = data.city.name;
  searchHistoryEl.append(pastSearchButton);

}



// Event Listeners to run function
searchFormEl.addEventListener("submit", handleSearchFormSubmit);

pastSearchButton.addEventListener("click", function(){
  var searchInput = pastSearchButton.textContent;
  getWeather(searchInput);
});

