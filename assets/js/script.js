$(document).ready(function (){
var city; 
var temp;
var wind;
var humid;
var lat;
var long;

//current city default mode
document.getElementById("cCity").style.display = 'none'
document.getElementById("fiveday").style.display = 'none'

//search for a city
$('#search').on("click", function(e) {  
  city = document.getElementById('cityName').value;
  console.log(city)
  let selectCity = city;
  // add city to choices
  col = $(`<button class="btn btn-secondary" type="button">` + selectCity + `</button></div>`)  
  $("#city-choices").append(col)

  document.getElementById("cCity").style.display = 'block';
  document.getElementById("fiveday").style.display = 'block'; 

  getWeather();      
})
  

//calls weather api
  function getWeather() {
    let key = '6d76fc1e41120a78b490437813c24634';
    let units = 'imperial';
    var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`;    

    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        //function displayData()
        dt = eval(data.dt * 1000)
        today = new Date(dt).toLocaleDateString('en-US')
        console.log ('Today is ' + today)
        lat = data.coord.lat
        long = data.coord.lon
        temp = data.main.temp;
        wind = data.wind.speed;
        humid = data.main.humidity;
        document.getElementById('cityname').innerHTML = city + ' (' + today + ')';
        document.getElementById('citytemp').innerHTML = 'Temp: ' + temp + '9\xB0F';
        document.getElementById('citywind').innerHTML = 'Wind: ' + wind + ' mph';
        document.getElementById('cityhumid').innerHTML = 'Humidity: ' + humid + '%';
          //function forecast()
          var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${key}`;      
          fetch(forecastUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              //display 5 day-forecast
              let d1 = data.list[0].dt_txt;
              let d2 = data.list[8].dt_txt;
              let d3 = data.list[16].dt_txt;
              let d4 = data.list[24].dt_txt;
              let d5 = data.list[32].dt_txt;
              document.getElementById('day-1').innerHTML = d1;
              document.getElementById('day-2').innerHTML = d2;
              document.getElementById('day-3').innerHTML = d3;
              document.getElementById('day-4').innerHTML = d4;
              document.getElementById('day-5').innerHTML = d5;
            })   
          })      
    }   
});



