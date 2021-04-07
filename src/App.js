import "./styles.css";

export default function App() {
  return (
    <div className="App">
    <div className="main-box default-box">
      <header>
        <div className="where-when">
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
        <div className="individual-forecast default-box">
          <p className="forecast-day">Wed</p>
          <img
            src="weather_icons/clear.png"
            alt="sunny"
            className="forecast-img"
          />
          <p className="forecast-temp">12°</p>
        </div>

        <div className="individual-forecast default-box">
          <p className="forecast-day">Thu</p>
          <img
            src="weather_icons/clear.png"
            alt="sunny"
            className="forecast-img"
          />
          <p className="forecast-temp">12°</p>
        </div>

        <div className="individual-forecast default-box">
          <p className="forecast-day">Fri</p>
          <img
            src="weather_icons/clear.png"
            alt="sunny"
            className="forecast-img"
          />
          <p className="forecast-temp">12°</p>
        </div>

        <div className="individual-forecast default-box">
          <p className="forecast-day">Sat</p>
          <img
            src="weather_icons/clear.png"
            alt="sunny"
            className="forecast-img"
          />
          <p className="forecast-temp">12°</p>
        </div>

        <div className="individual-forecast default-box">
          <p className="forecast-day">Sun</p>
          <img
            src="weather_icons/clear.png"
            alt="sunny"
            className="forecast-img"
          />
          <p className="forecast-temp">12°</p>
        </div>
      </div>
    </div>

    <footer>
      <p>created by Jordan Renaud</p>
      <a
        className="github-link"
        href="https://github.com/Jordan-Renaud/neumorphic_weather_app"
        >Check out the code on github</a
      >
      <br />
      <a className="resource-link" href="https://www.freepik.com/vectors/snow"
        >Snow vector created by creativepack - www.freepik.com</a
      >
      <br />
      <a className="resource-link" href="https://icons8.com/icon/111498/location"
        >Location icon by Icons8</a
      >
    </footer>
    <script src="src/index.js"></script>
    </div>
  );
}
