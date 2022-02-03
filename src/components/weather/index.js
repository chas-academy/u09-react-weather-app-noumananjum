import React, { useState, useEffect } from 'react';
import './styles.css';
import apiKey from '../apiKey';

export const Weather = ({ weatherData, handleConvert, convert }) => {
  const Farenheit = `${Math.round(weatherData.list[0].main.temp * 2 + 30)} F`
  const Celcius = `${Math.round(weatherData.list[0].main.temp)} C`
  const [unit, setUnit] = useState(Celcius)

  const oppositeUnit = unit === Celcius ? "farenheit" : "celsius";

  useEffect(() => {
    convert ? setUnit(Celcius) : setUnit(Farenheit)
  }, [Celcius, Farenheit, convert])

  const { icon } = weatherData.list[0].weather[0]

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${hours}:${minutes}, ${date} ${month} ${year}`
  }

  return (
    <>
      <main>
        <section className="weather">
          <header className="header" id="city-header">{weatherData.city.name}</header>
          <h3 className="date">{dateBuilder(new Date())}</h3>
          <section className="weather-temp">
            <img src={`${apiKey.icon}/${icon}@2x.png`} alt="weather-icon" height="150px" width="150px" />
            <section className="weather-info">
              <h1><i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i> {unit}&deg; </h1>
              <h2 className="description">  {weatherData.list[0].weather[0].main}</h2>
              <h3>
                <i class="fas fa-toggle-on" aria-hidden="true"></i><button title={`Switch to ${oppositeUnit}`} className="convert" onClick={handleConvert}> {oppositeUnit}</button>
              </h3>
            </section>
            <section className="weather-description">
              <div className="sunSetRise">
                <h2 className="padding"><i class="fa fa-sun-o" title="sunrise" aria-hidden="true"></i> { new Date(weatherData.city.sunrise * 1000).toLocaleTimeString('en-IN')}</h2>
                <h2><i class="fa fa-moon-o" title="sunset" aria-hidden="true"></i> { new Date(weatherData.city.sunset * 1000).toLocaleTimeString('en-IN')}</h2>
              </div>
              <div className="weather-h-s">
                <h2><i class="fa fa-tint" title="humidity" aria-hidden="true"></i> {weatherData.list[0].main.humidity} </h2>
                <h2><i class="fas fa-wind" title="wind"></i> {weatherData.list[0].wind.speed} </h2>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  )
}