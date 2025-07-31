import { useState, useEffect } from 'react'
import dbTools from '../Services/dbTools'

const WeatherDisplay = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [[lat, lng]] = Object.values(country.capitalInfo)

  useEffect(() => {
    dbTools.callWeather(lat, lng)
      .then(data => setWeatherData(data))
  }, [])

  if (weatherData) {
    return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {(weatherData.main.temp - 273.15).toFixed(1)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  )}
  else {
    return (
      <div>Loading weather data...</div>
    )
  }
}

export default WeatherDisplay