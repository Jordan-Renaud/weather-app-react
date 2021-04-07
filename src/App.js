import "./styles.css";
import WeatherApp from "./WeatherApp";

export default function App() {
  return (
    <div className="App">
      <WeatherApp />

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
