import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [weatherdata, setWeatherData] = useState({});
  useEffect(() => {
    const getWeatherCard = async () => {
      const apiKey = "307053e3cddde0d303289f81ce54ca8e";
      const lat = 51.4875167;
      const lon = -0.1687007;
      const country = "HI";
      const state = "INDIA";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      // const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid="3ce4f5d03d7665e9f9225d305387229e"`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.main);
      setWeatherData(data.main);
    };
    getWeatherCard();
  }, []);
  return (
    <div className="app-container">
      <div className="cards">
        <div className="card">
          <h4>{weatherdata.humidity}</h4>
          <p>{weatherdata.temp_min}</p>
          <p>{weatherdata.temp_max}</p>
          <p>{weatherdata.pressure}</p>
        </div>
      </div>
    </div>
  );
}
