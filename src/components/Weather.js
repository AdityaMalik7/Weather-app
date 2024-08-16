import React from "react";
import { useEffect, useState } from "react";
import cloud from "./cloud.png";

const Weather = () => {
  const [city, setCity] = useState();
  const [data, setData] = useState("");
  const [location, setLocation] = useState(null);

  const apiKey = "844f587aef0833b11f69316af8ee14b7";

  const getWeatherByCity = async (cityName) => {
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    const response = await fetch(urlCity);
    const data = await response.json();
    setData({
      temperature: data.main.temp,
      description: data.weather[0].description,
      min: data.main.temp_min,
      max: data.main.temp_max,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon,
      cityName: data.name,
    });
  };

  const getWeather = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setData({
      temperature: data.main.temp,
      description: data.weather[0].description,
      min: data.main.temp_min,
      max: data.main.temp_max,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon,
      cityName: data.name,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      getWeather(location.latitude, location.longitude);
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherByCity(city);
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-center pt-20">
          <div>
            {" "}
            <div className="text-white pt-20 pr-20">
              <h1 className="font-bold text-3xl">{data.cityName}</h1>
            </div>
            <div className="text-orange-400 font-bold text-xl pt-2  ">
              {""}
              {data.temperature} °C
            </div>
            <div className="text-orange-400  text-xl pb-5">
              <img className="h-16" src={cloud} alt="cloud" />
              {data.description}
            </div>
            <div className="text-white font-bold text-xl ">
              <p>min: {data.min} °C</p>
              <p>max: {data.max} °C</p>
              <p>humidity: {data.humidity}</p>
              <p>wind: {data.wind}</p>
            </div>
          </div>

          <form onSubmit={handleSearch}>
            <input
              className="border border-black rounded-full text-center  h-11 w-80 mr-20"
              placeholder="search "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="border border-black p-2 text-black bg-white rounded-full"
              Image
              source={require("./cloud.png")}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Weather;

// fetch function
// useEffect
// REST api basics
