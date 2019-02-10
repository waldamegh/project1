'use strict'
var request = require('request');

// Description: A simple Slack bot script using hubot.
// Bot Responce:
//  1) Have a class today?
//  2) Send a random quote.
//  3) Send a beautiful destination with picture for diffrent countries accross the world.
//  4) Weather in any city in the world.

module.exports = (robot) => {

  //=============================================================
  //Have a Class Today ?
  //=============================================================
  robot.hear(/have class/i, (res) => {
    //date object to get current date 
    var currentDate = new Date();
    //Year is 2019 and months are Jan, Feb, or Mar
    if (currentDate.getFullYear() == 2019 && currentDate.getMonth() < 3) {
      //Days are: Mon is 1 & Wen is 3
      if (currentDate.getDay() == 1 || currentDate.getDay() == 3) {
        //Hour is between 6pm to 9pm
        if (currentDate.getHours() < 18) {
          res.send("You have a JavaScript Class today at 6:00 pm.");
          return
        } else if (currentDate.getHours() > 17 && currentDate.getHours() < 22) {
          res.send(`Your JavaScript Class started befor ${currentDate.getHours() - 18}:${currentDate.getMinutes()}`);
          return
        } else {
          res.send("Your JavaScript class was ended at 9:00 pm.");
          return
        }
      }
    }
    res.send("There is no JavaScript class today.");
  });

  ///////////////////////////////////////

  //=============================================================
  //Send a Random Quote
  //=============================================================
  const quotes = ["A room without books is like a body without a soul. ― Marcus Tullius Cicero",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams. ― Dr. Seuss",
    "You only live once, but if you do it right, once is enough. ― Mae West",
    "Be the change that you wish to see in the world. ― Mahatma Gandhi",
    "A friend is someone who knows all about you and still loves you.― Elbert Hubbard",
    "A woman is like a tea bag; you never know how strong it is until it's in hot water. ― Eleanor Roosevelt",
    "Do what you can, with what you have, where you are. ― Theodore Roosevelt"];

  robot.respond(/quote/i, (res) => {
    res.reply(res.random(quotes))
  });

  //////////////////////////////////////

  //=============================================================
  //Send beautiful destination with picture for diffrent countries accross the world
  //=============================================================
  var beautifulDestination = {
    "saudi arabia": "Farasan Island, https://i.imgur.com/it0EXLG.png",
    "united arab emirates": "Dubai, https://i.imgur.com/lZzKa4j.png",
    "egypt": "Giza Pyramids, https://i.imgur.com/uJYzrR6.png",
    "jordan": "Petra, https://imgur.com/GfVeUYm.png",
    "japan": "Bamboo Forest, https://imgur.com/rlaBUUE.png",
    "peru": "Machu Picchu, https://imgur.com/lLpo1En.png"
  };
  robot.respond(/beautiful destination in (.*)/i, (res) => {
    let countryName = res.match[1];
    for (var key in beautifulDestination) {
      if (beautifulDestination.hasOwnProperty(countryName.toLowerCase())) {
        res.reply(`A beautiful destination in ${countryName} is ${beautifulDestination[countryName.toLowerCase()]}`);
        return
      }
    }
    res.reply(`Sorry, I don't know a beautiful destination in ${countryName} :( 
       These are the destinations that I can hep you: 
       Saudi Arabia, United Arab Emirates, Egypt, Jordan, Japan, Peru.`);
  });


  //////////////////////////////////////

  //=============================================================
  //Send the current weather of any city in the world
  //=============================================================
  //API key to openweathermap.org
  var apikey = "07dadcb1bed16df43265fc8aa5f9470d";

  //object contains all city weather info
  var cityWeather = {
    cityName: "",
    main: "",
    temp: "",
    humidity: "",
    icon: "",
    emoji: ""
  };

  //emoji in slack
  var weatherEmoji = {
    Thunderstorm: ":zap:",
    Drizzle: ":snow_cloud:",
    Rain: ":rain_cloud:",
    Snow: ":snowflake:",
    Clear: ":sunny:",
    Clouds: ":cloud:",
    Extreme: ":tornado:",
  };

  robot.respond(/weather in (.*)/i, (res) => {
    cityWeather.cityName = res.match[1];

    //Get of the URL returns a JSON script that contains city weather info
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityWeather.cityName + "&appid=" + apikey;
    request.get(requestUrl, function (error, respond, body) {
      if (error) {
        res.reply(`Sorry, I have an Erorr: ${error}`);
        return
      } else {
        //pase JSON and update cityWeather object
        var result = JSON.parse(body);
        cityWeather.main = result.weather[0].main;
        cityWeather.temp = parseInt(result.main.temp - 273) + " °C";
        cityWeather.humidity = result.main.humidity + " %";
        cityWeather.icon = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
        if (cityWeather.main in weatherEmoji) {
          cityWeather.emoji = weatherEmoji[cityWeather.main];
        }
        //responce 
        res.reply(`Weather in ${cityWeather.cityName} is: 
        ${cityWeather.main} ${cityWeather.emoji}
        Temperature is ${cityWeather.temp} 
        Humidity is ${cityWeather.humidity}
        weather icon: ${cityWeather.icon}`);
      }
    });

  });

}
