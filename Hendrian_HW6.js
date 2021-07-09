
var button = document.querySelector(".submitButton")
var inputValue = document.querySelector(".formInput")
var Cityname = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var cityList = document.getElementById('cityList');
//const APIkey = a4c1af3d27f902574d5705216ab8c44c;

// Loop generates User's Search history from local storage. 
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
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
        var currentTemp = (((data['main']['temp']-273.15)*1.8)+32).toFixed(2);
        console.log(currentTemp);
       //fixing windspeed bug
        var currentHumid = data['main']['humidity'];
        var currentWind = data['wind']['speed'];
        console.log(currentHumid);
        console.log(currentWind);

      //pulls the current lattitude and longitude from the data, and stores it so its ready to use on the UV call. 
       var currentLat = data['coord']['lat']
       var currentLon = data ['coord']['lon']
        
       //Displays the current lat/long.
        console.log(currentLat+" "+ currentLon)
        console.log(cityName)

        //creates a value/reference for element of local storage, and posts it to the search history.
        var cityName = $(".list-group").addClass("list-group-item");
        cityName.append("<li><button>" +currentCityName+ "</li></button>")
        local = localStorage.setItem(listNumber, currentCityName)  
        listNumber = listNumber + 1 

        //This adds the current name of the city to the card, and clears the previous entry. 
        var currentCard = $(".currentCard").append("<div>").addClass("card-body");
        currentCard.empty();
        var currentName = currentCard.append("<p>");
        currentCard.append(currentName);


        //updats the current card to reflect the changes. 
        var currentTemp = currentName.append("<p>");
        currentName.append(currentTemp);
        currentTemp.append("<p>" + "Current Temperature: " + (((data['main']['temp']-273.15)*1.8)+32).toFixed(2) + "</p>");
        currentTemp.append("<p>" + "Current Humidity: " + data['main']['humidity'] + "%" + "</p>");
        currentTemp.append("<p>" + "Wind speed: " + data['wind']['speed'] + "</p>");

        
        //MUST use a different API call to get UV using the previously stored lat+long. 
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
                //This var doesn't do anyhting - it just checks the if statement and logs it to the console. 
                var severity = "favorable";
                console.log(severity);
                currentTemp.append(currentUV);

                //This changes the background color of the card. 
                document.getElementById("card").style.background='green'
                

            } else if (uvValue<9){
                var severity = "moderate";
                console.log(severity);
               currentTemp.append(currentUV);
               document.getElementById("card").style.background='yellow'

            } else if (uvValue>=9){
                var severity = "High";
                console.log(severity);
               currentTemp.append(currentUV);
               document.getElementById("card").style.background='yellow'
               

            } else {
                var severity = "No UV Data reported."
                console.log(severity);
        
            }

            console.log(currentUV)
            currentTemp.append(currentUV);
            


        })
        

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
         var localFiveTempOne = (((data.list[0].main.temp -273.15)*1.8)+32).toFixed(2);
         var localFiveHumidOne = data.list[0].main.humidity;
         var localFiveIconOne = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
         console.log(localFiveHumidOne)
         console.log(localFiveTempOne)
         console.log(localFiveIconOne)
         $("#futureTemp1").prepend(localFiveTempOne)
         $("#futureHumidity1").prepend(localFiveHumidOne)
         $("#futureIcon").attr('src', localFiveIconOne)
   
         

         var localFiveTempTwo = (((data.list[1].main.temp -273.15)*1.8)+32).toFixed(2);
         var localFiveHumidTwo = data.list[1].main.humidity;
         var localFiveIconTwo = "https://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png";
         console.log(localFiveHumidTwo)
         console.log(localFiveTempTwo)
         $("#futureTemp2").prepend(localFiveTempTwo)
         $("#futureHumidity2").prepend(localFiveHumidTwo)
         $("#futureIcon2").attr('src', localFiveIconTwo)

         var localFiveTempThree = (((data.list[2].main.temp -273.15)*1.8)+32).toFixed(2);
         var localFiveHumidThree = data.list[2].main.humidity;
         var localFiveIconThree = "https://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png";
         console.log(localFiveHumidThree)
         console.log(localFiveTempThree)
         $("#futureTemp3").prepend(localFiveTempThree)
         $("#futureHumidity3").prepend(localFiveHumidThree)
         $("#futureIcon3").attr('src', localFiveIconThree)

         var localFiveTempFour = (((data.list[3].main.temp -273.15)*1.8)+32).toFixed(2);
         var localFiveHumidFour = data.list[3].main.humidity;
         var localFiveIconFour = "https://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png";
         console.log(localFiveHumidFour)
         console.log(localFiveTempFour)
         $("#futureTemp4").prepend(localFiveTempFour)
         $("#futureHumidity4").prepend(localFiveHumidFour)
         $("#futureIcon4").attr('src', localFiveIconFour)
         
         var localFiveTempFive = (((data.list[4].main.temp-273.15)*1.8)+32).toFixed(2);
         var localFiveHumidFive = data.list[4].main.humidity;
         var localFiveIconFive= "https://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png";
         console.log(localFiveHumidFive)
         console.log(localFiveTempFive)
         $("#futureTemp5").prepend(localFiveTempFive)
         $("#futureHumidity5").prepend(localFiveHumidFive)
         $("#futureIcon5").attr('src', localFiveIconFive)

     })
     .catch(function() {
        // catch errors
     })

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

    $("#futureIcon1").empty();
    $("#futureIcon2").empty();
    $("#futureIcon3").empty();
    $("#futureIcon4").empty();
    $("#futureIcon5").empty();
    document.getElementById("card").style.background='white'
});