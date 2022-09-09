// Variables used for search and search history functions
const searchFormEl = $('#searchform');
const searchCity = $('#locationsearch');
const searchCityButton = $('#searchbtn');
const searchHistoryEl = $('#search-history');

function searchCityValue(event) {
    event.preventDefault();

    const searchCityText = $('#locationsearch').value.trim();

    if (searchCityText === "") {
        console.error('Please enter a city');
        return;
    }
}

function displaySearchHistory(){}


searchCityButton.addEventListener('click', searchCityValue);

searchHistoryEl.addEventListener('click', displaySearchHistory);

const weatherAPI ='https://api.openweathermap.org/data/2.5/weather?q=" + searchCityText + "&units=imperial&appid=073e596cca8ed71b557304d86f8bfbdc';