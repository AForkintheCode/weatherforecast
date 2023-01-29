$(document).ready(function (){
var city; 

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
  $("#currentCity").append(city)
  getApi();

//get city deets
  function getApi() {
    let key = '6d76fc1e41120a78b490437813c24634';
    let units = 'imperial';
    var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}



});

//display 5 day-forecast



});
