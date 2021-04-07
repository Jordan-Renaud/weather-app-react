import React from "react";
import "./Weather.css";
import Forecast from "./Forecast";

export default function Weather() {
    return <div className="Weather">
        <div className="todays-weather">
        <div className="current-weather">
          <img
            className="current-weather-img"
            src="weather_icons/cloudy.png"
            alt="weather_img"
          />
          <p className="current-temp">16</p>
          <button className="celius-to-farenheit default-button">°C</button>
          <p className="weather-description">Cloudy</p>
        </div>

        <div className="details default-box">
          <div className="grid-container">
            <div><p className="low label">L</p></div>
            <div>
              <p className="low-temp data">8°</p>
            </div>
            <div><p className="high label">H</p></div>
            <div>
              <p className="high-temp data">20°</p>
            </div>
            <div>
              <img
                className="icon"
                src="weather_icons/wind_flag.png"
                alt="wind flag"
              />
            </div>
            <div><p className="wind-speed data">11km/h NW</p></div>
            <div>
              <img
                className="icon"
                src="weather_icons/umbrella.png"
                alt="umbrella icon"
              />
            </div>
            <div>
              <p className="rain-percentage data"><span>36</span>%</p>
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