$(document).ready(function (){
var city; 
//search for a city
$('#search').on("click", function(e) {  
  city = document.getElementById('cityName').value;
  console.log(city)
  let selectCity = city;
  // add city to choices
  row = $(`<div class="row">`)
  col1 = $(`<button class="btn btn-secondary" type="button">` + selectCity + `</button></div>`)
  row.append(col1)
  
  $("#city-choices").append(row)
  
  $("#currentCity").append(city)

//get city deets
  function getApi() {
    var requestUrl = `api.openweathermap.org/data/2.5/weather?q={` + city + `}&appid={ca20830d7cbe86ec9c4bfe66abe7a008}`
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
