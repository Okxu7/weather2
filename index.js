  function FormatData(timestamp) {
let data = new Date(timestamp);
let hours = data.getHours();
if (hours < 10) {
 hours = `0${hours}`;   
}
let minutes = data.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = data.getDay(); 
return `${day}  ${hours}:${minutes}`;
  }  

  function formatDay(timestamp) {
   let data = new Date(timestamp * 1000); 
   let day =  data.getDay();
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   return days[day];
  } 




  function displayForecast(response) {  
     console.log(response.data.daily); 
     let forecast =  response.data.daily; 
    let forecastElement = document.querySelector("#forecast");
   
    let forecastHTML = `<div class="row">`;
   
      forecast.forEach(function(forecastDay, index) {
        if (index < 5) {     
          
          forecastHTML =
            forecastHTML +
            `        
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="90"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
              </div> 
      `;} 
      });
  forecastHTML = forecastHTML + `</div>`;  
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


function getForecast(coordinates) {
   console.log(coordinates);
let apiKey = "f6738bc1f8964130a4c224735222809";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;  
   console.log(apiUrl);
   axios.get(apiUrl).then(displayForecast); 
  }
  
 

function showTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp;

  let dataElement = document.querySelector("#data");
  dataElement.innerHTML = FormatData(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://www.weatherapi.com/docs/weather_conditions.csv`
  );
  // https://www.weatherapi.com/docs/conditions.json

  iconElement.setAttribute("alt", response.data.location);
  getForecast(response.data.coord);
}





//api.weatherapi.com/v1
function search(city) {
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
 
 
  function  handleSubmit(event) {
event.preventDefault();
let cityInput = document.querySelector("#city-input"); 
search(cityInput.value);
  }     

   function displayFahrenheiTemperature(event) { 
   let temperatureElement = document.querySelector("#temperature"); 
   let fahrenheiTemperature =  celsiusTemperature * 9 / 5 + 32;
   console.log(fahrenheiTemperature);
   temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
   }

   function displayCelsiusTemperature(event) {
   let temperatureElement = document.querySelector("#temperature");  
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
   console.log(celsiusTemperature);
   }
 
let  celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);   
 
let fahrenheiLink = document.querySelector("#fahrenhei-link");
fahrenheiLink.addEventListener("click", displayFahrenheiTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
displayFahrenheiTemperature(77);

  //displayForecast();

/*----function displayForecast(response) {
   So to get current weather for London: JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}
 
To get 7 day weather for US Zipcode 07112: JSON: http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7-*/