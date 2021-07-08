//error in selector - review this!

var button = document.querySelector(".submitButton")
var inputValue = document.querySelector(".formInput")
var Cityname = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var cityList = document.getElementById('cityList');


// Loop generates Search history. 
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

//Testing API key with a call to London. 
//"https://api.openweathermap.org/data/2.5/weather?q=London&appid=a4c1af3d27f902574d5705216ab8c44c"

//Function Firing!
console.log(inputValue+"firing");
console.log("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.nodeValue+"&appid=a4c1af3d27f902574d5705216ab8c44c");
var listNumber = 0;

button.addEventListener('click',function(FindCity){
   
    //This pulls the data from the searchbox and adds it to the display. 
    var searchInput = $(".formInput").val();
    console.log(searchInput);

    //This stores the object information into local storage. 
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=a4c1af3d27f902574d5705216ab8c44c")
     .then(response => response.json())
     .then(data => {
        var currentCityName = data['name'];
        console.log(currentCityName);
        var currentTemp = data['main']['temp'];
        console.log(currentTemp);
        
       //These throw an error for now. 
       var currentLat = data['coord']['lat']
       var currentLon = data ['coord']['lon']

      // var futureweather = data['list']['dt']
       //console.log(futureweather);
        
       //Displays the current lat/long.
        console.log(currentLat+" "+ currentLon)
        console.log(cityName)

        //creates a value/reference for element of local storage. 
        var cityName = $(".list-group").addClass("list-group-item");
        cityName.append("<li><button>" +currentCityName+ "</li></button>")
        local = localStorage.setItem(listNumber, currentCityName)  
        listNumber = listNumber + 1 

        //new block
        var currentCard = $(".currentCard").append("<div>").addClass("card-body");
        currentCard.empty();
        var currentName = currentCard.append("<p>");
        // .addClass("card-text");
        currentCard.append(currentName);


        //new block
        var currentTemp = currentName.append("<p>");
       
        currentName.append(currentTemp);
        currentTemp.append("<p>" + "Temperature: " + data['main']['temp'] + "</p>");
        
        //Fix bug with append.
        //currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
       // currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        
        var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=a4c1af3d27f902574d5705216ab8c44c&lat=${currentLat}&lon=${currentLon}`
        console.log(urlUV)

        //fetches UV value, and adds it to currentTemp.
        fetch(urlUV)
         .then(response => response.json())
         .then(data => {

            var uvValue = data['value']
            console.log(uvValue)

           //bug fixed!
            var currentUV = currentTemp.append("<p>" + "UV Index: " + uvValue+ "</p>").addClass("card-text");
            currentUV.addClass("UV");
            
            //if statement assigns a UV index to the location.
            if(uvValue<=3){
                var severity = "favorable";
                console.log(severity);
            } else if (uvValue<9){
                var severity = "moderate";
                console.log(severity);
            } else if (uvValue>=9){
                var severity = "High";
                console.log(severity);
            } else {
                var severity = "No UV Data reported."
                console.log(severity);
            }

            console.log(currentUV)
            currentTemp.append(currentUV);

        })
        
        //If statement to highlight severity. 
        

    //ToDo
    //Add icon for description 
    //add windspeed

    //empty 5 day forecast if there is any previous value. If future temp has any value, everything is emptied for the next call. 
    if($("#futureTemp1") || $("#futureTemp2") || $("#futureTemp3") || $("#futureTemp4") || $("#futureTemp5") != ""){
    $("#futureTemp1").empty();
    $("#futureTemp2").empty();
    $("#futureTemp3").empty();
    $("#futureTemp4").empty();
    $("#futureTemp5").empty();

    $("#futureHumidity1").empty();
    $("#futureHumidity2").empty();
    $("#futureHumidity3").empty();
    $("#futureHumidity4").empty();
    $("#futureHumidity5").empty();

    $("#futureIcon1").empty();
    $("#futureIcon2").empty();
    $("#futureIcon3").empty();
    $("#futureIcon4").empty();
    $("#futureIcon5").empty();
}

  

     //Gets the fiveday forecast for the current item. The URL call is different, using forecast instead of weather. 
     fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInput+ '&appid=a4c1af3d27f902574d5705216ab8c44c' + '&cnt=5')  
     .then(function(resp) {
         return resp.json() 
     })
     .then(function(data) {
         console.log('--->'+(JSON.stringify(data)));
        //This seems to be working
         var future1 = data.list[1].dt;
         //var future1 = response.list[1];
         console.log(future1);

         //setting the future blocks
         var localFiveTempOne = data.list[0].main.temp;
         var localFiveHumidOne = data.list[0].main.humidity;
         var localFiveIconOne = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
         console.log(localFiveHumidOne)
         console.log(localFiveTempOne)
         console.log(localFiveIconOne)
         $("#futureTemp1").prepend(localFiveTempOne)
         $("#futureHumidity1").prepend(localFiveHumidOne)
         $("#futureIcon").attr('src', localFiveIconOne)
   
         

         var localFiveTempTwo = data.list[1].main.temp;
         var localFiveHumidTwo = data.list[1].main.humidity;
         var localFiveIconTwo = "https://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png";
         console.log(localFiveHumidTwo)
         console.log(localFiveTempTwo)
         $("#futureTemp2").prepend(localFiveTempTwo)
         $("#futureHumidity2").prepend(localFiveHumidTwo)
         $("#futureIcon2").attr('src', localFiveIconTwo)

         var localFiveTempThree = data.list[2].main.temp;
         var localFiveHumidThree = data.list[2].main.humidity;
         var localFiveIconThree = "https://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png";
         console.log(localFiveHumidThree)
         console.log(localFiveTempThree)
         $("#futureTemp3").prepend(localFiveTempThree)
         $("#futureHumidity3").prepend(localFiveHumidThree)
         $("#futureIcon3").attr('src', localFiveIconThree)

         var localFiveTempFour = data.list[3].main.temp;
         var localFiveHumidFour = data.list[3].main.humidity;
         var localFiveIconFour = "https://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png";
         console.log(localFiveHumidFour)
         console.log(localFiveTempFour)
         $("#futureTemp4").prepend(localFiveTempFour)
         $("#futureHumidity4").prepend(localFiveHumidFour)
         $("#futureIcon4").attr('src', localFiveIconFour)
         
         var localFiveTempFive = data.list[4].main.temp;
         var localFiveHumidFive = data.list[4].main.humidity;
         var localFiveIconFive= "https://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png";
         console.log(localFiveHumidFive)
         console.log(localFiveTempFive)
         $("#futureTemp5").prepend(localFiveTempFive)
         $("#futureHumidity5").prepend(localFiveHumidFive)
         $("#futureIcon5").attr('src', localFiveIconFive)

     })
     .catch(function() {
        // catch any errors
     })



     



       
 
    //var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=a4c1af3d27f902574d5705216ab8c44c&lat=${response.coord.lat}&lon=${response.coord.lon}`
  //  var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=a4c1af3d27f902574d5705216ab8c44c&lat=${currentLat}&lon=${currentLon}


  //BUG FIXED!!! :) 
  .catch(err => alert("invalid city name!"))

})
})

//clears history when user clears by removing the local storage, and clearing the display card. 

$("#clear-history").click(function() {
    localStorage.clear();
    $('#cityList').empty();
    $('#card').empty();
    $('currentCard').empty();
   
    $("#futureTemp1").empty();
    $("#futureTemp2").empty();
    $("#futureTemp3").empty();
    $("#futureTemp4").empty();
    $("#futureTemp5").empty();

    $("#futureHumidity1").empty();
    $("#futureHumidity2").empty();
    $("#futureHumidity3").empty();
    $("#futureHumidity4").empty();
    $("#futureHumidity5").empty();
});

//TO-DO 
// 1) Save searches as keys with object values. DONE
// 2) Display current values to page. DONE
// 3) Display past values to page. 
// 4) clear storage/history. DONE
// 5) add UV index! DONE
// 6) style. 
// 7) If you have time, create an "if" function for the UV index. 


/*
function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    var description = d.weather[0].description; 
    
    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
    document.getElementById('location').innerHTML = d.name+' '+d.sys.country;
}


//NOTE: this type of call can sometimes return errors on space-seperated city names. Try using cities "Boston","Detroit", or "Columbus". 

/*

function callPrevious (){

}

//When the user clicks a past search input, it runs the previous function as 
button.addEventListener('click',function(callPrevious){
  console.log("firing!")
  //use .this to select an item from the list and display it.
  var oldCity = $(".Cityname").val(); 
  console.log(oldCity);
  //var oldCity = this.$(Cityname)
})
*/

//Try this. 
/*
$("form").submit(function() {
    // Print the value of the button that was clicked
    console.log($(document.activeElement).val());
 })
*/  /*
 $("#cityList li").click(function() {
    // Print the value of the button that was clicked
    console.log($(this).text());
 })
*/
//retrieves the name of the previously searched item. 
// document.getElementById("cityList").addEventListener("click",function() {
    /*
 $("#cityList li").click(function() {
    var oldCity = this.text();
    console.log($(this).text());
    console.log($(this).html());
    console.log(oldCity);
    
    

    //runs the exact same function when a past city is clicked, only this is triggered by specific button push. 
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+oldCity+"&appid=a4c1af3d27f902574d5705216ab8c44c")
     .then(response => response.json())
     .then(data => {
        var currentCityName = data['name'];
        console.log(currentCityName);
        var currentTemp = data['main']['temp'];
        console.log(currentTemp);
        
       //These throw an error for now. 
       var currentLat = data['coord']['lat']
       var currentLon = data ['coord']['lon']
        
       //Displays the current lat/long.
        console.log(currentLat+" "+ currentLon)
        console.log(cityName)

        //creates a value/reference for element of local storage. 
        var cityName = $(".list-group").addClass("list-group-item");
        cityName.append("<li><button>" +currentCityName+ "</li></button>")
        local = localStorage.setItem(listNumber, currentCityName)  
        listNumber = listNumber + 1 

        //new block
        var currentCard = $(".currentCard").append("<div>").addClass("card-body");
        currentCard.empty();
        var currentName = currentCard.append("<p>");
        // .addClass("card-text");
        currentCard.append(currentName);


        //new block
        var currentTemp = currentName.append("<p>");
        // .addClass("card-text");
        currentName.append(currentTemp);
        currentTemp.append("<p>" + "Temperature: " + data['main']['temp'] + "</p>");
        // Add Humidity
        //currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        // // Add Wind Speed: 
       // currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        
        var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=a4c1af3d27f902574d5705216ab8c44c&lat=${currentLat}&lon=${currentLon}`
        console.log(urlUV)

        //throws an error, but retrieves value.
        fetch(urlUV)
         .then(response => response.json())
         .then(data => {

            var uvValue = data['value']
            console.log(uvValue)

            //I suspect the bug is occuring here. L74 for Reference. 
            var currentUV = currentTemp.append("<p>" + "UV Index: " + uvValue+ "</p>").addClass("card-text");
            currentUV.addClass("UV");
            
            //if statement assigns a UV index to the location. 
            if(uvValue<=3){
                var severity = "favorable";
                console.log(severity);
            } else if (uvValue<9){
                var severity = "moderate";
                console.log(severity);
            } else if (uvValue>=9){
                var severity = "High";
                console.log(severity);
            } else {
                var severity = "No UV Data reported."
                console.log(severity);
            }

            console.log(currentUV)
            currentTemp.append(currentUV);

        })


    })
    
})
*/


