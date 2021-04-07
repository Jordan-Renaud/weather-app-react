import React from "react";
import "./Forecast.css";

export default function Forecast({day, imgName, temp}){
    return <div className="Forecast">
      <div className="individual-forecast default-box">
        <p className="forecast-day">{day}</p>
        <img
          src={imgName}
          alt="sunny"
          className="forecast-img"
        />
        <p className="forecast-temp">{temp}°</p>
      </div>
    </div>
}