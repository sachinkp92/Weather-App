import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "010d": rain_icon,
  "010n": rain_icon,
  "013d": snow_icon,
  "013n": snow_icon,
};

const WeatherApp = () => {
  const apiKey = "";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icon,
      });
      setCity("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    search("New Delhi");
  }, []);
  const { temperature, humidity, location, windSpeed, icon } = weatherData;
  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search City"
          onChange={(event) => setCity(event.target.value)}
          value={city}
        />
        <img src={search_icon} alt="search-logo" onClick={() => search(city)} />
      </div>
      <img src={icon} alt="clear-icon" className="weather-icon" />
      <p className="temperature">{temperature}°C</p>
      <p className="location">{location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="humidity" />
          <div>
            <p>{windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
