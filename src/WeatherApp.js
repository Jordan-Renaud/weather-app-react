import React from "react";
import "./WeatherApp.css";
import Weather from "./Weather";

export default function WeatherApp() {
    return <div className="WeatherApp">
        <div className="main-box default-box">
        <header>
          <div>
            <h1 className="location">London, UK</h1>
            <h2 className="date">Tuesday 16<sup>th</sup>, March</h2>
          </div>

          <div className="search-location">
            <button className="get-location-button default-button">
              <img src="get_location_icon.png" alt="map icon" />
            </button>
            <input
              className="search-city-input"
              type="text"
              placeholder="&#xF002; Search city"
            />
          </div>
        </header>

      <Weather />
      </div>
    </div>
}