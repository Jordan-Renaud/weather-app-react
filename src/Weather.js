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
    };
};

//conversions -weathercode to img
function weatherCodeToImg(code, isDayTime) {
    if ((code >= 200 && code <= 202) || (code >= 230 && code <= 232)) {
        return isDayTime ? "weather_icons/rain_lightning.png" : "weather_icons/night_rain_lightning.png";
    } else if (code >= 210 && code <= 221) {
        return isDayTime ? "weather_icons/lightning.png" : "weather_icons/night_lightning.png";
    } else if (code >= 300 && code <= 531) {
        return isDayTime ? "weather_icons/rain.png" : "weather_icons/night_rain.png";
    } else if (code >= 600 && code <= 602) {
        return isDayTime ? "weather_icons/snow.png" : "weather_icons/night_snow.png";
    } else if (code >= 611 && code <= 622) {
        return "weather_icons/sleet.png";
    } else if (code == 800) {
        return isDayTime ? "weather_icons/clear.png" : "weather_icons/night_clear.png";
    } else if (code == 801 || code == 802) {
        return isDayTime ? "weather_icons/scattered_clouds.png" : "weather_icons/night_cloudy.png";
    } else if (code == 803) {
        return "weather_icons/cloudy.png";
    } else if (code == 804) {
        return "weather_icons/very_cloudy.png";
    } else {
        return "error";
    }
};

export default function Weather(props) {
  let [openWeatherJSON, setOpenWeatherJSON] = useState(null);
  let [accuweatherJSON, setaccuweatherJSON] = useState(null);

  useEffect(() => {
    if (props.openWeather) {
      setOpenWeatherJSON(props.openWeather)
      setaccuweatherJSON(props.accuweather)
    }
  }, [props.openWeather]);
  

  if (openWeatherJSON == null) {
    return <div></div>
  } else {
    const currentTemp = Math.floor(openWeatherJSON.list[0].main.temp);
    const weatherIcon = openWeatherJSON.list[0].weather[0].id;
    const weatherDescription = openWeatherJSON.list[0].weather[0].main;
    const low = Math.floor(accuweatherJSON.DailyForecasts[0].Temperature.Minimum.Value);
    const high = Math.floor(accuweatherJSON.DailyForecasts[0].Temperature.Maximum.Value);
    const windSpeed = Math.round(openWeatherJSON.list[0].wind.speed);
    const windDirection = windDirectionConversion(openWeatherJSON.list[0].wind.deg);
    const rainChance = openWeatherJSON.list[0].pop;

  return <div className="Weather">
          <div className="todays-weather">
          <div className="current-weather">
            <img
              className="current-weather-img"
              src={weatherCodeToImg(weatherIcon, true)}
              alt="weather_img"
            />
            <p className="current-temp">{currentTemp}</p>
            <button className="celius-to-farenheit default-button">°C</button>
            <p className="weather-description">{weatherDescription}</p>
          </div>

          <div className="details default-box">
            <div className="grid-container">
              <div><p className="low label">L</p></div>
              <div>
                <p className="low-temp data">{low}°</p>
              </div>
              <div><p className="high label">H</p></div>
              <div>
                <p className="high-temp data">{high}°</p>
              </div>
              <div>
                <img
                  className="icon"
                  src="weather_icons/wind_flag.png"
                  alt="wind flag"
                />
              </div>
              <div><p className="wind-speed data">{windSpeed}km/h {windDirection}</p></div>
              <div>
                <img
                  className="icon"
                  src="weather_icons/umbrella.png"
                  alt="umbrella icon"
                />
              </div>
              <div>
                <p className="rain-percentage data"><span>{rainChance}</span>%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="future-forecast">
          <Forecast day="Wed" imgName="weather_icons/clear.png" temp={12} />
          <Forecast day="Thu" imgName="weather_icons/clear.png" temp={12} />
          <Forecast day="Fri" imgName="weather_icons/clear.png" temp={12} />
          <Forecast day="Sat" imgName="weather_icons/clear.png" temp={12} />
          <Forecast day="Sun" imgName="weather_icons/clear.png" temp={12} />
        </div>
        </div>
    } 
}