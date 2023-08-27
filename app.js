const { resolveSoa } = require("dns");
const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

    // res.send("Server is up and running");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "9022ba1543a37d2d5b8db0448c11a250";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const description = weatherData.weather[0].description;
            console.log(description);
            // console.log(weatherData);
            const icon = weatherData.weather[0].icon;
            const iconDisplay = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently " + description );
            res.write("<h1>The temp in "+query+" is " +temp+ " degree Celcius.</h1>");
            res.write("<img src='"+iconDisplay+"'/>");
            res.send();
        })
    })
})

// 


app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})