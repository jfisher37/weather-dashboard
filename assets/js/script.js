// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

    //create Els for button, input
let cityInputEl = document.getElementById('cityInput');
let searchButtonEl = document.getElementById('search-button');
let previousSearchEl = document.getElementById('prev-search-btns');
let previousSearches = [];


function getWeatherData (city){

    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=b6cf514b1b8a55f68c735702f7fe14d4';

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
      })

};

    // create button functionality
searchButtonEl.onclick = function(){
    if (!cityInputEl.value){
        return;
    };
    if(previousSearches.includes(cityInputEl.value)){
        return;
    };
    if (previousSearches.length > 9) {
        previousSearches.pop();
    };

    let currentSearch = cityInputEl.value; 
    previousSearches.unshift(currentSearch)
    console.log(previousSearches);
    while (previousSearchEl.hasChildNodes()){
        previousSearchEl.removeChild(previousSearchEl.firstChild)
    };

    for (let i = 0; i< previousSearches.length; i++){
        localStorage.setItem('prevCity['+ i + ']', previousSearches[i]);
        let prevSearchButtons = document.createElement('button');
        prevSearchButtons.setAttribute('class', 'prevSearchButton');
        prevSearchButtons.setAttribute('id', 'prevSearchButton['+ i + ']');
        prevSearchButtons.innerHTML = previousSearches[i];
        let newButtonLi = document.createElement('li');
        newButtonLi.appendChild(prevSearchButtons);
        previousSearchEl.appendChild(newButtonLi);
        
    }

    getWeatherData(currentSearch);
    //save the input value to local storage, with an index affixed. Create a variable as index.

    //create buttons that are appended into previous search container as list items. If there are more than 10 search items, pop the last one push them into the front (shift?)
}

    // create function that will fetch API data and push it into today and future cards

// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city