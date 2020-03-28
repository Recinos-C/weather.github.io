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
    var cityID = $("city-search").val().trim();
    console.log(cityID);

    $("#cities").append("<a class='btn btn-primary'>City</a>");
    $("a").last().text(cityID);

    // var weather = $(this).attr("data-weather");
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&APPID=677f3bd14a8cd0b98400e32c5b25a2cc";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var weatherDiv = $("#forecast")
        var temp = response.Temperature;
        var humid = response.Humidity;
        var wind = response.Windspeed;
        var uvIndex = respons.Uvindex;

        var card = $("<div class='card-body'>");
        var day = $("<p class='card-text'>");

        $("#city").text("Wind Speed:" + cityID);
        $("#temp").text("Wind Speed:" + temp);
        $("#humidity").text("Wind Speed:" + humid);
        $("#wind").text("Wind Speed:" + wind);
        $("#uv").text("Wind Speed:" + uvIndex);

        for (var i = 0; i < 6; i++) {
            weatherDiv.append(card);
            card.append(day);
            day.text(temp);
            card.append(day);
            card.last().text(humid);
        }
        pushData();
    })

});