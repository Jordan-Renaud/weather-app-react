import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import Weather from "./Weather";
import axios from "axios";

const openWeatherApiKey = "8d030da1fb95c3588ed90416bc6b659f";
const accuweatherApiKey = "PeqNwlVzmYXTRnHfn14Juel2uZejZeRS";

export default function WeatherApp() {
  let [openWeatherJSON, setOpenWeatherJSON] = useState(null);
  let [accuweatherJSON, setAccuweatherJSON] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handlePosition);
  }, []);

  function handleClick(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePosition);
  }

  function handlePosition(position) {
    const { latitude, longitude } = position.coords;
    apiCall(latitude, longitude);
  }

  function apiCall(latitude, longitude) {
    Promise.all([
      getOpenWeatherJSON(latitude, longitude),
      getLocationKey(latitude, longitude),
    ]).then(handleData);
  }

  function getOpenWeatherJSON(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
    console.log(`open weather map url = ${url}`);
    return axios.get(url);
  }

  function getLocationKey(lat, lon) {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuweatherApiKey}&q=${lat}%2C${lon}&details=true`;
    console.log(`geoposition search url = ${url}`);
    return axios.get(url).then(getAccuweatherJSON);
  }

  function getAccuweatherJSON(locationJSON) {
    const locationKey = locationJSON.data.Key;
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${accuweatherApiKey}&metric=true`;
    console.log(`accuweather url = ${url}`);
    return axios.get(url);
  }

  function handleData(JSONarray) {
    setOpenWeatherJSON(JSONarray[0].data);
    setAccuweatherJSON(JSONarray[1].data);
  }

  function handleSearch(event) {
    if (event.key === "Enter") {
      searchForCity(event.target.value);
    }
  }

  function searchForCity(city) {
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}&units=metric`;
    console.log(`city url = ${openWeatherURL}`);
    axios.get(openWeatherURL).then(getCoordsFromCity).catch(incorrectCityName);
  }

  //deals with incorrect city names and alerts.
  function incorrectCityName(error) {
    alert("Error finding city, please try again");
  }

  //gets the coords for a correct city
  function getCoordsFromCity(JSON) {
    const lat = `${JSON.data.city.coord.lat}`;
    const lon = `${JSON.data.city.coord.lon}`;
    apiCall(lat, lon);
  }

  return (
    <div className="WeatherApp">
      <div className="main-box default-box">
        <header>
          <div>
            <h1 className="location">
              {openWeatherJSON
                ? `${openWeatherJSON.city.name}, ${openWeatherJSON.city.country}`
                : null}
            </h1>
            <h2 className="date">
              Tuesday 16<sup>th</sup>, March
            </h2>
          </div>

          <div className="search-location Search">
            <button
              className="get-location-button default-button"
              onClick={handleClick}
            >
              <img src="get_location_icon.png" alt="map icon" />
            </button>
            <input
              className="search-city-input"
              type="text"
              placeholder="&#xF002; Search city"
              onKeyPress={handleSearch}
            />
          </div>
        </header>

        <Weather openWeather={openWeatherJSON} accuweather={accuweatherJSON} />
      </div>
    </div>
  );
}
