window.onload = function (){
    console.log("hello world I exist")

var weatherInfo = {};
savedInput = [];

function pushData() {
    //     // //     // creates an object out of user information, have user input be global variables
    weatherInfo = {
        "City": cityID,
        "Temperature": temp,
        "Humidity": humid,
        "Wind-Speed": wind,
        "UV-Index": uvIndex
    }
    //     // //     // pushes object variable into the array, have this last since we need to store
    //     // //     // the users help request into the object as well
    savedInput.push(userInfo); 
    //     // //     // pushes the whole thing into locall storage
    localStorage.setItem("savedInput", JSON.stringify(savedInput));
    console.log(localStorage.getItem("savedInput"))

}


$("button").on("click", function (event) {

    event.preventDefault();
    var cityID = $("#city-search").val().trim();
    console.log(cityID);

    $("#cities").append("<a class='btn btn-primary'>City</a>");
    $("a").last().text(cityID);

    // var weather = $(this).attr("data-weather");
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityID + "&APPID=677f3bd14a8cd0b98400e32c5b25a2cc";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {    
        var weatherDiv = $("#forecast")
        var temp = Math.floor(((response.list[0].main.temp - 273.15)*1.8)+32) + "°";
        var humid = response.list[0].main.humidity;
        var wind = response.list[0].wind.speed; 
        var uvIndex = response.list[0].main.temp_kf;
        var card = $("<div class='card-body'>");
        var day = $("<p class='card-text'>");

        $("#city").text("City: " + cityID);
        $("#temp").text("Temperature: " + temp);
        $("#humidity").text("Humidity: " + humid);
        $("#wind").text("Wind Speed: " + wind);
        $("#uv").text("UV Index: " + uvIndex);
        pushData();
        for (var i = 0; i < 6; i++) {
            weatherDiv.append(card);
            card.append(day);
            day.text(temp);
            card.append(day);
            card.last().text(humid);
        }

    })

});
}