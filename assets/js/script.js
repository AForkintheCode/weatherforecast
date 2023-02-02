$(document).ready(function (){
//var city; 
var temp;
var wind;
var humid;
var lat;
var long;
var cond;
var cities = JSON.parse(localStorage.getItem('chooseCities')) || [];


//current city default mode
document.getElementById("cCity").style.display = 'none'
document.getElementById("fiveday").style.display = 'none'

//search for a city
$('#search').on("click", function(e) {  
  
  var city = document.getElementById('cityName').value;

  if (city == null || city ==''){
    alert("Please enter a city.")
    return false;
  }

  console.log(city)
  
  // reveal city display
  document.getElementById("cCity").style.display = 'block';
  document.getElementById("fiveday").style.display = 'block'; 
  
  getWeather(city);
  cities.push(city);
  localStorage.setItem('citiesLocal', JSON.stringify(cities))
  console.log(cities)
  $('#city-choices').html("");
  buildButtons();
  

  
})

// select city to display 

function buildButtons(){  
  $('#city-choices').html("");
  var citiesStored = JSON.parse(localStorage.getItem('citiesLocal')) || []; 
  if(citiesStored.length > 0){
    $('#city-choices').html("");
    for (let i=0; i < citiesStored.length; i++){    
        // Create button 
      col = $(`<button class="btn btn-secondary cityselect" data-city="${citiesStored[i]}" type="button">${citiesStored[i]}</button>`) 
      $('#city-choices').append(col)
    }
  } 
    
  
    // delegate event listener
    $(".cityselect").on('click', function (event){  
      event.preventDefault();      
      console.log($(this).attr("data-city")) 
      city = ($(this).attr("data-city"))      
      getWeather(city);
    })
}



//calls weather api
  function getWeather(city) {
    let key = '6d76fc1e41120a78b490437813c24634';
    let units = 'imperial';
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`;    

    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        //function displayData()
        dt = eval(data.dt * 1000)
        today = new Date(dt).toLocaleDateString('en-US')
        lat = data.coord.lat
        long = data.coord.lon
        temp = data.main.temp;
        wind = data.wind.speed;
        humid = data.main.humidity;
        cond = data.weather[0].icon;        
        document.getElementById('cityname').innerHTML = city + ' (' + today + ') <img src="https://openweathermap.org/img/wn/' + cond + '@2x.png"></img>';
        document.getElementById('citytemp').innerHTML = 'Temp: ' + temp + '\xB0F';
        document.getElementById('citywind').innerHTML = 'Wind: ' + wind + ' mph';
        document.getElementById('cityhumid').innerHTML = 'Humidity: ' + humid + '%';
          //function forecast()
          var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${key}`;      
          fetch(forecastUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              //display 5 day-forecast
              let d1 = eval(data.list[0].dt * 1000)
              let c1 = new Date(d1).toLocaleDateString('en-US')            
              let d1t = data.list[0].main.temp;              
              let d1w = data.list[0].wind.speed;
              let d1h = data.list[0].main.humidity;
              let d2 = eval(data.list[8].dt * 1000)
              let c2 = new Date(d2).toLocaleDateString('en-US') 
              let d2t = data.list[8].main.temp;
              let d2w = data.list[8].wind.speed;
              let d2h = data.list[8].main.humidity;
              let d3 = eval(data.list[16].dt * 1000)
              let c3 = new Date(d3).toLocaleDateString('en-US') 
              let d3t = data.list[16].main.temp;
              let d3w = data.list[16].wind.speed;
              let d3h = data.list[16].main.humidity;
              let d4 = eval(data.list[24].dt * 1000)
              let c4 = new Date(d4).toLocaleDateString('en-US') 
              let d4t = data.list[24].main.temp;
              let d4w = data.list[24].wind.speed;
              let d4h = data.list[24].main.humidity;
              let d5 = eval(data.list[32].dt * 1000)
              let c5 = new Date(d5).toLocaleDateString('en-US') 
              let d5t = data.list[32].main.temp;
              let d5w = data.list[32].wind.speed;
              let d5h = data.list[32].main.humidity; 

              //images
              let d1i = data.list[0].weather[0].icon;
              let d2i = data.list[8].weather[0].icon;
              let d3i = data.list[16].weather[0].icon;
              let d4i = data.list[24].weather[0].icon;
              let d5i = data.list[32].weather[0].icon;
              document.getElementById('d1-img').innerHTML = '<img src="https://openweathermap.org/img/wn/' + d1i + '@2x.png"></img>'
              document.getElementById('d2-img').innerHTML = '<img src="https://openweathermap.org/img/wn/' + d2i + '@2x.png"></img>'
              document.getElementById('d3-img').innerHTML = '<img src="https://openweathermap.org/img/wn/' + d3i + '@2x.png"></img>'
              document.getElementById('d4-img').innerHTML = '<img src="https://openweathermap.org/img/wn/' + d4i + '@2x.png"></img>'
              document.getElementById('d5-img').innerHTML = '<img src="https://openweathermap.org/img/wn/' + d5i + '@2x.png"></img>'             
                            
              //update forecast
              for (let i=1; i<=5; i++){
                var st1 = `document.getElementById('day-` + i + `').innerHTML = c` + i + `;`
                var st2 = `document.getElementById('d` + i + `-temp').innerHTML = 'Temp: ' + d` + i + `t + '\xB0F';`
                var st3 = `document.getElementById('d` + i + `-wind').innerHTML = 'Wind: ' + d` + i + `w + ' mph';`
                var st4 = `document.getElementById('d` + i + `-humid').innerHTML = 'Humidity: ' + d` + i + `h + '%';`
                eval(st1);                
                eval(st2);
                eval(st3);
                eval(st4);  
                
              }
            })   
          })      
    }  
    
  // buildButtons();
});



