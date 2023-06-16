const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");


const app = express();

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/", (req, res) => {
    const cityName = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +  cityName +"&appid=";
    https.get(url, (response) => {
        response.on("data", (d) => {
            const weatherData = JSON.parse(d)
            const weatherDescription = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                
            if (cityName === " ") {

            }else {
                res.render("weather", {cityname: cityName, description: weatherDescription, img:imgUrl})
            }
                 
        })
    })
})

app.listen(3000, () => {
    console.log("server is live at port: 3000")
})