import React, { useState, useEffect } from "react";
import "./Weather.css";
import Forecast from "./Forecast";

//conversions -windspeed to compass points
function windDirectionConversion(degree) {
  if (degree < 22.5 || degree > 337.5) {
    return "N";
  } else if (degree < 67.5) {
    return "NE";
  } else if (degree < 112.5) {
    return "E";
  } else if (degree < 157.5) {
    return "SE";
  } else if (degree < 202.5) {
    return "S";
  } else if (degree < 247.5) {
    return "SW";
  } else if (degree < 292.5) {
    return "W";
  } else if (degree < 337.5) {
    return "NW";
  } else {
    return "Error";
  }
}

//conversions -weathercode to img
function weatherCodeToImg(code) {
  if ((code >= 200 && code <= 202) || (code >= 230 && code <= 232)) {
    return "weather_icons/rain_lightning.png";
  } else if (code >= 210 && code <= 221) {
    return "weather_icons/lightning.png";
  } else if (code >= 300 && code <= 531) {
    return "weather_icons/rain.png";
  } else if (code >= 600 && code <= 602) {
    return "weather_icons/snow.png";
  } else if (code >= 611 && code <= 622) {
    return "weather_icons/sleet.png";
  } else if (code == 800) {
    return "weather_icons/clear.png";
  } else if (code == 801 || code == 802) {
    return "weather_icons/scattered_clouds.png";
  } else if (code == 803) {
    return "weather_icons/cloudy.png";
  } else if (code == 804) {
    return "weather_icons/very_cloudy.png";
  } else {
    return "error";
  }
}

//get dates for the forcast
function getDateIdObj(weatherJSON) {
  let dateArray = [];

  weatherJSON.list.forEach((collection) => {
    let currentDate = collection.dt_txt.split(" ")[0];
    if (!dateArray.includes(currentDate)) {
      dateArray.push(currentDate);
    }
  });
  dateArray.shift();

  return dateArray.map(
    (day) => `${parseInt(day.substr(8, 2))}/${parseInt(day.substr(5, 2))}`
  );
}

//takes openweather JSON to get the weatherIDs for 5 days, returns array.
function getWeatherIDs(weatherJSON) {
  //get days and all ids added to the day, returns an obj of .
  function getDateIdObj(weatherJSON) {
    let dateObj = {};

    weatherJSON.list.forEach((collection) => {
      let currentDate = collection.dt_txt.split(" ")[0];
      if (!dateObj.hasOwnProperty(currentDate)) {
        dateObj[currentDate] = [0];
      }
      dateObj[currentDate].push(collection.weather[0].id);
    });

    return dateObj;
  }

  //count repetitions of weatherIDs, return a obj of ids and the amount they repeat.
  function getWeatherIdCountObj(dateIdObj) {
    let dateWeatherIdObj = {};

    for (const date in dateIdObj) {
      let idArray = dateIdObj[date];
      dateWeatherIdObj[date] = {};

      idArray.forEach((id) => {
        if (!id == 0) {
          if (dateWeatherIdObj[date].hasOwnProperty(id)) {
            dateWeatherIdObj[date][id]++;
          } else {
            dateWeatherIdObj[date][id] = 1;
          }
        }
      });
    }
    return dateWeatherIdObj;
  }

  //finds most common id and returns an array
  function findMostCommonID(dateIDCount) {
    let idArray = [];
    let mostCommonID = 0;
    let highestNum = 0;

    for (const date in dateIDCount) {
      let idCountObj = dateIDCount[date];

      for (const id in idCountObj) {
        if (idCountObj[id] > highestNum) {
          highestNum = idCountObj[id];
          mostCommonID = id;
        }
      }

      idArray.push(mostCommonID);
      mostCommonID = 0;
      highestNum = 0;
    }

    idArray.shift();
    return idArray;
  }

  const dateIdObj = getDateIdObj(weatherJSON);
  const dateIDCount = getWeatherIdCountObj(dateIdObj);
  const idArray = findMostCommonID(dateIDCount);
  return idArray;
}

//takes openweather JSON to get the highs for 5 days, returns array.
function getHighs(weatherJSON) {
  let dateDict = {};
  let highArray = [];

  //get days and all temps added to the day.
  weatherJSON.list.forEach((collection) => {
    let currentDate = collection.dt_txt.split(" ")[0];
    if (!dateDict.hasOwnProperty(currentDate)) {
      dateDict[currentDate] = [0];
    }
    dateDict[currentDate].push(collection.main.temp);
  });

  //iterates through dictionary and adds and rounds the highest temp to highArray
  for (const day in dateDict) {
    highArray.push(Math.floor(Math.max(...dateDict[day])));
  }

  //removes first element of highArray as it is the current day.
  highArray.shift();
  return highArray;
}

export default function Weather(props) {
  const openWeatherJSON = props.openWeather;
  const accuweatherJSON = props.accuweather;

  function createCelsiusObj(openWeatherJSON, accuweatherJSON) {
    let weatherObj = {
      currentTemp: Math.floor(openWeatherJSON.list[0].main.temp),
      weatherIcon: openWeatherJSON.list[0].weather[0].id,
      weatherDescription: openWeatherJSON.list[0].weather[0].main,
      low: Math.floor(
        accuweatherJSON.DailyForecasts[0].Temperature.Minimum.Value
      ),
      high: Math.floor(
        accuweatherJSON.DailyForecasts[0].Temperature.Maximum.Value
      ),
      windSpeed: Math.round(openWeatherJSON.list[0].wind.speed),
      windDirection: windDirectionConversion(openWeatherJSON.list[0].wind.deg),
      rainChance: Math.round(openWeatherJSON.list[0].pop),
      forcastImgIdArray: getWeatherIDs(openWeatherJSON),
      forcastTempArray: getHighs(openWeatherJSON),
      days: getDateIdObj(openWeatherJSON),
    };
    return weatherObj;
  }

  function createFarenheitObj(openWeatherJSON, accuweatherJSON) {
    function convertToFarenheit(num) {
      return Math.floor((num * 9) / 5 + 32);
    }

    let farenheitObj = {
      currentTemp: Math.floor(
        convertToFarenheit(openWeatherJSON.list[0].main.temp)
      ),
      weatherIcon: openWeatherJSON.list[0].weather[0].id,
      weatherDescription: openWeatherJSON.list[0].weather[0].main,
      low: Math.floor(
        convertToFarenheit(
          accuweatherJSON.DailyForecasts[0].Temperature.Minimum.Value
        )
      ),
      high: Math.floor(
        convertToFarenheit(
          accuweatherJSON.DailyForecasts[0].Temperature.Maximum.Value
        )
      ),
      windSpeed: Math.floor(openWeatherJSON.list[0].wind.speed / 1.609),
      windDirection: windDirectionConversion(openWeatherJSON.list[0].wind.deg),
      rainChance: Math.round(openWeatherJSON.list[0].pop),
      forcastImgIdArray: getWeatherIDs(openWeatherJSON),
      forcastTempArray: getHighs(openWeatherJSON).map((temp) =>
        Math.floor(convertToFarenheit(temp))
      ),
      days: getDateIdObj(openWeatherJSON),
    };

    return farenheitObj;
  }

  let [isCelsius, setIsCelsius] = useState(true);

  function updateMeasurementType() {
    if (isCelsius) {
      setIsCelsius(false);
    } else {
      setIsCelsius(true);
    }
  }

  if (openWeatherJSON == null || accuweatherJSON == null) {
    return <div></div>;
  } else {
    let weatherObj = isCelsius
      ? createCelsiusObj(openWeatherJSON, accuweatherJSON)
      : createFarenheitObj(openWeatherJSON, accuweatherJSON);

    return (
      <div className="Weather">
        <div className="todays-weather">
          <div className="current-weather">
            <img
              className="current-weather-img"
              src={weatherCodeToImg(weatherObj.weatherIcon)}
              alt="weather_img"
            />
            <p className="current-temp">{weatherObj.currentTemp}</p>
            <button
              className="celius-to-farenheit default-button"
              onClick={updateMeasurementType}
            >
              °C
            </button>
            <p className="weather-description">
              {weatherObj.weatherDescription}
            </p>
          </div>

          <div className="details default-box">
            <div className="grid-container">
              <div>
                <p className="low label">L</p>
              </div>
              <div>
                <p className="low-temp data">{weatherObj.low}°</p>
              </div>
              <div>
                <p className="high label">H</p>
              </div>
              <div>
                <p className="high-temp data">{weatherObj.high}°</p>
              </div>
              <div>
                <img
                  className="icon"
                  src="weather_icons/wind_flag.png"
                  alt="wind flag"
                />
              </div>
              <div>
                <p className="wind-speed data">
                  {weatherObj.windSpeed}km/h {weatherObj.windDirection}
                </p>
              </div>
              <div>
                <img
                  className="icon"
                  src="weather_icons/umbrella.png"
                  alt="umbrella icon"
                />
              </div>
              <div>
                <p className="rain-percentage data">
                  <span>{weatherObj.rainChance}</span>%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="future-forecast">
          {weatherObj.days.map((day, index) => (
            <Forecast
              key={day}
              day={day}
              imgName={weatherCodeToImg(weatherObj.forcastImgIdArray[index])}
              temp={weatherObj.forcastTempArray[index]}
            />
          ))}
        </div>
      </div>
    );
  }
}
