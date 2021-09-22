// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

    //create Els for button, input
let cityInputEl = document.getElementById('cityInput');
let searchButtonEl = document.getElementById('search-button');
let previousSearchEl = document.getElementById('prev-search-btns');
let todayCardEl = document.getElementById('weather-today');
let previousSearches = [];
let todayUl = document.createElement('ul');

function generateAllCards(data, container, name){
   
       let weatherIcon = document.createElement('img');
       console.log(data.weather[0].icon);
       weatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon + '@2x.png')
       name.appendChild(weatherIcon);
       
       
       let tempLi = document.createElement ('li');
       tempLi.innerHTML = 'Temp: ' + data.main.temp + '°F';
       todayUl.appendChild(tempLi);
       let windLi = document.createElement ('li');
       windLi.innerHTML = 'Wind: ' + data.wind.speed + ' MPH';
       todayUl.appendChild(windLi);
       let humidLi = document.createElement ('li');
       humidLi.innerHTML = 'Humidity: ' + data.main.humidity + '%';
       todayUl.appendChild(humidLi);
       container.appendChild(todayUl);
}

function renderFutureCards(city){

    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid=95ef123b38c031799d08dde42cb52cf2&units=imperial';

    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
          console.log(data);
        })

}

function renderTodayCard (city){

    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=95ef123b38c031799d08dde42cb52cf2&units=imperial';

    let cityName = document.createElement('h1');
    cityName.innerHTML = city + ' (' + moment().format("MM-DD-YY") + ')';
    todayCardEl.appendChild(cityName);

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data){
        generateAllCards(data, todayCardEl, cityName);
        let latLonUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=95ef123b38c031799d08dde42cb52cf2&units=imperial';
       
        fetch(latLonUrl)
            .then(function (responseLL) {
                console.log(responseLL);
                return responseLL.json();
                })
            .then(function (dataLL) {
                let uvLi = document.createElement ('li');
                console.log(dataLL);
                uvLi.innerHTML = 'UV Index: ' + dataLL.current.uvi;
                console.log(dataLL.current.uvi);
                if (dataLL.current.uvi < 3) {
                    uvLi.setAttribute('style', 'background-color: green; display: inline-block; padding: 1px; border-radius: 4px')
                }
                else if (dataLL.current.uvi >= 3 && dataLL.current.uvi < 8) {
                    uvLi.setAttribute('style', 'background-color: orange; display: inline-block; padding: 1px; border-radius: 4px')
                }
                else if (dataLL.current.uvi >= 8) {
                    uvLi.setAttribute('style', 'background-color: orange; display: inline-block; padding: 1px; border-radius: 4px')
                }
                todayUl.appendChild(uvLi);
    }); 

    //     console.log(data);
    //    let cityName = document.createElement('h1');
    //    cityName.innerHTML = city + ' (' + moment().format("MM-DD-YY") + ')';
    //    let weatherIcon = document.createElement('img');
    //    console.log(data.weather[0].icon);
    //    weatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon + '@2x.png')
    //    cityName.appendChild(weatherIcon);
    //    todayCardEl.appendChild(cityName);
    //    let todayUl = document.createElement('ul');
    //    let tempLi = document.createElement ('li');
    //    tempLi.innerHTML = 'Temp: ' + data.main.temp + '°F';
    //    todayUl.appendChild(tempLi);
    //    let windLi = document.createElement ('li');
    //    windLi.innerHTML = 'Wind: ' + data.wind.speed + ' MPH';
    //    todayUl.appendChild(windLi);
    //    let humidLi = document.createElement ('li');
    //    humidLi.innerHTML = 'Humidity: ' + data.main.humidity + '%';
    //    todayUl.appendChild(humidLi);
    //    todayCardEl.appendChild(todayUl);

       
       
     
       
       
      })
    };

// };

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

    renderTodayCard(currentSearch);
    // renderFutureCards(currentSearch);
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