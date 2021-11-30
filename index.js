const request = require('request');
const rateLimit = require('express-rate-limit');
const express = require('express');
const path = require('path');

// const jsonfile = require('jsonfile')
var fs = require('fs');

//init app
const app = express()
const port = 5500

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

//Rate limiting
const limiter = rateLimit({
  windowMs: 30 * 1000, //30 sec
  max: 2,
  message: '403 HTTP Forbidden server responses'
});

app.use(limiter);

//home route
app.get('/', (req, res) => {
  res.render("index");
});

//country route
app.get('/all/:country', (req, res) => {
  let country = req.params.country;
  let weatherInfo;
  let flag;
  let temporary;
  fs.readFile('./weather.json', "utf8", (error, word) => {
    if(error) {
      console.log(error);
      return;
    }
    try {
      weatherInfo = JSON.parse(word);
      flag = false;
      for(let i=0; i<weatherInfo.length; i++) {
        temporary = weatherInfo[i];
        if(temporary.country == country.toLowerCase()) {
          flag = true;
          res.render('index', {
            city: temporary.city.toUpperCase(),
            country: temporary.country.toUpperCase(),
            maxCel: temporary.maxCel,
            minCel: temporary.minCel,
            maxFar: temporary.maxFar,
            minFar: temporary.minFar
          });
        }
        if(flag == true) {
          break;
        }
      }
      if(flag == false) {
        let fetchOption = {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
          qs: { q: country, days: "3" },
          headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key": "98fcb74d0bmshe4ee341eef7d5a6p1eb421jsnf7f9e87ceb3d",
            useQueryString: true
          },
        };
        request(fetchOption, function (error, response, body) {
          if(error) {
            res.render("locationError", {message: "404 location not found"});
          }
          //else if goes here
          else if (response.statusCode == 400) {
            res.render('badReq.pug');
          }
          else {
            let info = JSON.parse(body);
            let myCountry = info.location.country;
            let myCity = info.location.name;
            if( req.params.country.toLowerCase() == info.location.country.toLowerCase() ) {
              let maxTemp = 0;
              let minTemp = 0;
              let maxTempFar = 0;
              let minTempFar = 0;
              for (let i = 0; i < 3; i++) {
                maxTemp = maxTemp + info.forecast.forecastday[i].day.maxtemp_c;
                minTemp = minTemp + info.forecast.forecastday[i].day.mintemp_c;
                maxTempFar = maxTempFar + info.forecast.forecastday[i].day.maxtemp_f;
                minTempFar = minTempFar + info.forecast.forecastday[i].day.mintemp_f;
              }
              let avgMaxTemp = maxTemp / 3;
              let avgMinTemp = minTemp / 3;
              let avgMaxTempFar = maxTempFar/3;
              let avgMinTempFar = minTempFar/3;
              const obj = {
                country: myCountry.toLowerCase(),
                city: myCity.toLowerCase(),
                maxCel: Math.round(avgMaxTemp), 
                minCel: Math.round(avgMinTemp), 
                maxFar: Math.round(avgMaxTempFar), 
                minFar: Math.round(avgMinTempFar)
              };
              weatherInfo.push(obj);
              console.log("Weather info: ", weatherInfo);
              const json = JSON.stringify(weatherInfo, null, 2);
              fs.writeFile('./weather.json', json, (error) => {
                if(error) {
                  console.log(error);
                } else {
                  console.log("Written into file");
                }
              });
              res.render('index', {
                country: myCountry.toUpperCase(),
                city: myCity.toUpperCase(),
                maxCel: Math.round(avgMaxTemp), 
                minCel: Math.round(avgMinTemp), 
                maxFar: Math.round(avgMaxTempFar), 
                minFar: Math.round(avgMinTempFar)
              });
            }
            //else goes here
            else{
              res.render("badReq")
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

// city route
app.get('/all/:country/:city', (req, res) => {
  let country = req.params.country;
  let weatherInfo;
  let flag;
  let temporary;
  fs.readFile('./weather.json', "utf8", (error, word) => {
    if(error) {
      console.log(error);
      return;
    }
    try {
      weatherInfo = JSON.parse(word);
      flag = false;
      for(let i=0; i<weatherInfo.length; i++) {
        temporary = weatherInfo[i];
        if(temporary.country == country.toLowerCase()) {
          flag = true;
          res.render('index', {
            city: temporary.city.toUpperCase(),
            country: temporary.country.toUpperCase(),
            maxCel: temporary.maxCel,
            minCel: temporary.minCel,
            maxFar: temporary.maxFar,
            minFar: temporary.minFar
          });
        }
        if(flag == true) {
          break;
        }
      }
      if(flag == false) {
        let fetchOption = {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
          qs: { q: country, days: "3" },
          headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key": "98fcb74d0bmshe4ee341eef7d5a6p1eb421jsnf7f9e87ceb3d",
            useQueryString: true
          },
        };
        request(fetchOption, function (error, response, body) {
          if(error) {
            res.render("404 location not found");
          }
          //else if goes here
          else if (response.statusCode == 400) {
            res.render('badReq.pug');
          }
          else {
            let info = JSON.parse(body);
            let myCountry = info.location.country;
            let myCity = info.location.name;
            if( req.params.country.toLowerCase() == info.location.country.toLowerCase() ) {
              let maxTemp = 0;
              let minTemp = 0;
              let maxTempFar = 0;
              let minTempFar = 0;
              for (let i = 0; i < 3; i++) {
                maxTemp = maxTemp + info.forecast.forecastday[i].day.maxtemp_c;
                minTemp = minTemp + info.forecast.forecastday[i].day.mintemp_c;
                maxTempFar = maxTempFar + info.forecast.forecastday[i].day.maxtemp_f;
                minTempFar = minTempFar + info.forecast.forecastday[i].day.mintemp_f;
              }
              let avgMaxTemp = maxTemp / 3;
              let avgMinTemp = minTemp / 3;
              let avgMaxTempFar = maxTempFar/3;
              let avgMinTempFar = minTempFar/3;
              const obj = {
                country: myCountry.toLowerCase(),
                city: myCity.toLowerCase(),
                maxCel: Math.round(avgMaxTemp), 
                minCel: Math.round(avgMinTemp), 
                maxFar: Math.round(avgMaxTempFar), 
                minFar: Math.round(avgMinTempFar)
              };
              weatherInfo.push(obj);
              console.log("Weather info: ", weatherInfo);
              const json = JSON.stringify(weatherInfo, null, 2);
              fs.writeFile('./weather.json', json, (error) => {
                if(error) {
                  console.log(error);
                } else {
                  console.log("Written into file");
                }
              });
              res.render('index', {
                country: myCountry.toUpperCase(),
                city: myCity.toUpperCase(),
                maxCel: Math.round(avgMaxTemp), 
                minCel: Math.round(avgMinTemp), 
                maxFar: Math.round(avgMaxTempFar), 
                minFar: Math.round(avgMinTempFar)
              });
            }
            //else goes here
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

//all 
app.all('*', (req, res) => {
  res.render('locationError', { message: "This resource was not found" })
})

//start server
app.listen(port, () => {
  console.log(`Assignment 3 server running at http://localhost:${port}`)
});
