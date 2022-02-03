import React from 'react';
import apiKey from '../apiKey';
import './styles.css';

export const Forecast = ({ forecastData, convert }) => {
  const dailyData = {};

  forecastData.list.forEach((item => {
    const dateTime = new Date(item.dt * 1000);
    const day = dateTime.getDate();
    const time = dateTime.getHours();
    if (!dailyData[day])
      dailyData[day] = [];
    dailyData[day].push({ ...item, day, time });
  }));

  return (
    <main>
      <section className="forecast" id="todays-forecast">
        <header className="forecast-header">Today's Forecast</header>
        {Object.values(dailyData).map((items, index) => index === 0 && (
          <div className="forecast-container">
            {Object.values(items).map((days) => (
              <div className="hourly">
                <h2 key={days.main}>
                  {days.dt_txt.includes('06:00:00') && ('Dawn')}
                  {days.dt_txt.includes('09:00:00') && ('Morning')}
                  {days.dt_txt.includes('12:00:00') && ('Noon')}
                  {days.dt_txt.includes('15:00:00') && ('Afternoon')}
                  {days.dt_txt.includes('18:00:00') && ('Evening')}
                  {days.dt_txt.includes('21:00:00') && ('Night')}
                  {days.dt_txt.includes('00:00:00') && ('Midnight')}
                  {days.dt_txt.includes('03:00:00') && ('Latenight')}
                </h2>
                <img src={`${apiKey.icon}/${days.weather[0].icon}@2x.png`} alt="weather-icon" width="120" height="120" />
                <h2><i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i> {convert ? days.main.temp : Math.round(days.main.temp * 2 + 30)}&deg;</h2>
                <details>
                  <summary></summary>
                  <p><i class="fa fa-tint" title="humidity" aria-hidden="true"></i> {days.main.humidity}</p>
                  <p><i class="fas fa-wind" title="wind"></i> {days.wind.speed}</p>
                </details>
              </div>
            ))}
          </div>
        ))}
      </section>
      <section className="forecast" id="five-days-forecast">
        <header className="forecast-header"> Weekly Forecast </header>
        <div className="forecast-container">
          {Object.values(dailyData).map((items) =>
            <>
              {Object.values(items).map((days, index) => {
                const getWeekDays = new Date(days.dt_txt)
                const weekdayStr = getWeekDays.toString()
                const weekday = weekdayStr.substring(0, 3)
                return (
                  index === 4 && (
                    <div className="daily">
                      <h2>{weekday}</h2>
                      <img src={`${apiKey.icon}/${days.weather[0].icon}@2x.png`} alt="weather-icon" width="200" height="200" />
                      <h3><i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i> {convert ? days.main.temp : Math.round(days.main.temp * 2 + 30)}&deg;</h3>
                      <details>
                        <summary></summary>
                        <p><i class="fa fa-tint" title="humidity" aria-hidden="true"></i> {days.main.humidity}</p>
                        <p><i class="fas fa-wind" title="wind"></i> {days.wind.speed}</p>
                      </details>
                    </div>
                  )
                )
              })}
            </>)}
        </div>
      </section>
    </main>
  )
}
