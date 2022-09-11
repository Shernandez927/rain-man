// Variables used for search and search history functions
const apiKey = "554f6e2a0ea6794e7db1dd1d10c95025";
const searchCityEl = document.querySelector('#locationsearchinput');
// const searchInput = document.querySelector('#locationsearchinput').value.trim();
const searchFormEl = document.querySelector('#searchform');
const searchCityButton = document.querySelector('#searchbtn');
const resultTextEl = document.querySelector('#result-text');
const currentForecastEl = document.querySelector('#current-forecast');
// Variables to append new elements to
const currentWeatherEl = document.querySelector('#current-weather');
const fiveDayEl = document.querySelector('#five-day-forecast');
const searchHistoryEl = document.querySelector('#search-history');
// const apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" +apiKey + "&units=imperial";


    function handleSearchFormSubmit(event) {
    event.preventDefault();

    // Variable to store city text input as parameter used in API url
    const searchInput = document.querySelector('#locationsearchinput').value.trim();

    // If conditional statement to console an error if empty text input is submitted
    if (!searchInput) {
        console.error("Please enter a City");
        return;
    }

    getWeather(searchInput);
}

    function getWeather(searchInput) {
      const apiURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey + "&units=imperial";
      fetch(apiURL)
        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }
          return response.json();
        })
        .then(function (data) {
          console.log(data)
          displayCurrentWeather(data)
        });

    }

    // function to append current weather data to create and append text and weather icon to current weather body element
    function displayCurrentWeather(data) {

        const resultName = document.createElement('h2');
        resultName.classList.add("text-center", "p-2");
        resultName.textContent = "Showing weather for: " + data.city.name;
        currentWeatherEl.append(resultName);

        const resultIcon = document.createElement('img');
        resultIcon.src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
        currentWeatherEl.append(resultIcon);

        const resultTemp = document.createElement('p')
        resultTemp.textContent = "Temperature: " + data.list[0].main.temp.toFixed(1) + "\u2109";
        currentWeatherEl.append(resultTemp)

        const resultWind = document.createElement('p');
        resultWind.textContent = "Wind Speed: " + data.list[0].wind.speed.toFixed(1) + " MPH";
        currentWeatherEl.append(resultWind);

        const resultHumidity = document.createElement('p');
        resultHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        currentWeatherEl.append(resultHumidity);
    
    }


// event listener to run function
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// searchHistoryEl.addEventListener('click', displaySearchHistory);
