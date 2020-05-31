window.onload = function () {
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
        $("#forecast").empty()
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
            console.log(response.list)
            var weatherDiv = $("#forecast")
            var temp = Math.floor(((response.list[0].main.temp - 273.15) * 1.8) + 32) + "°";
            var humid = response.list[0].main.humidity;
            var wind = response.list[0].wind.speed;
            var uvIndex = response.list[0].main.temp_kf;

            // Append items for weather forcast
            $("#city").text("City: " + cityID);
            $("#temp").text("Temperature: " + temp);
            $("#humidity").text("Humidity: " + humid);
            $("#wind").text("Wind Speed: " + wind);
            $("#uv").text("UV Index: " + uvIndex);


            // Appends five day forcast   
            for (var i = 0; i < 6; i++) {
                var main = $("<div class='card text-white bg-primary mb-3' style='max-width: 18rem;'>")
                var header = $("<div class='card-header'>");
                var card = $("<div class='card-body'>");
                var title = $("<h5 class='card-title'>");
                var day = $("<p class='card-text'>");
                var list = $("<ul>");
                var li1 = $("<li>")
                var li2 = $("<li>")
                var li3 = $("<li>")
                var li4 = $("<li>")
                
                

                weatherDiv.append(main.append(header,card).append(title,day,list.append(li1,li2,li3, li4)));
               header.text(response.list[i].dt_txt);
               title.text("Todays Forcast")
               li1.text("Humidity: " + humid)
               li2.text("Wind speed: "+ wind)
               li3.text("Temperature: " + temp)
               li4.text("UV Index" + uvIndex)



                var temp = Math.floor(((response.list[i].main.temp - 273.15) * 1.8) + 32) + "°";
                var humid = response.list[i].main.humidity;
                var wind = response.list[i].wind.speed;
                var uvIndex = response.list[i].main.temp_kf;
                console.log("Five day forecast")
                console.log(response.list[i].sys.dt_txt)
                console.log(humid)
                console.log(temp)
                console.log(uvIndex)
                console.log(wind)
            }
            pushData();
        })

    });
}