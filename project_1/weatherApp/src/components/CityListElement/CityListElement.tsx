// This is the CityListElement component. It displays the city name, weather icon, and temperature for a city.
// Users can also favorite the city.

import { useState } from 'react'
import './CityListElement.css'
import getWeatherIcon from '../../utils/getWeatherIcon'
import { Link } from 'react-router-dom'
import useWeatherHook from '../../utils/api_hooks/useWeatherHook'
import cityCoordinates from '../../utils/coordinates/cityCoordinates'

interface CityListElementProps {
  cityName: string
}

function CityListElement({ cityName }: CityListElementProps) {
  // Fetch weather data for the specified city using a custom hook
  const { data: cityWeatherData, isLoading } = useWeatherHook(cityCoordinates[cityName])
  // Initialize the 'isFavorite' state based on the user's local storage
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem(cityName) === 'true')

  // Function to toggle the 'isFavorite' state and update local storage
  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite
      localStorage.setItem(cityName, String(newIsFavorite))
      return newIsFavorite
    })
  }

  if (isLoading) {
    // Handle the case where data is still loading or unavailable
    return <div>Loading weather data...</div>
  }

  if (!cityWeatherData.hourly || !Array.isArray(cityWeatherData.hourly.temperature_2m)) {
    // Check if API-response has the correct structure
    return <div>Invalid weather data format for {cityName}</div>
  }

  // Handle potential undefined values
  const hourlyTemperature = cityWeatherData.hourly?.temperature_2m || []
  const temperatures = hourlyTemperature.slice(0, 24)

  // Calculate the maximum and minimum temperatures for the city
  const cityTempMax = Math.max(...temperatures)
  const cityTempMin = Math.min(...temperatures)

  // Calculate the average precipitation and cloud coverage for the city
  const sumOfRain = cityWeatherData.hourly.rain.reduce((acc: number, rain: number) => acc + (isNaN(rain) ? 0 : rain), 0)
  const sumOfClouds = cityWeatherData.hourly.cloudcover.reduce(
    (acc: number, cloud: number) => acc + (isNaN(cloud) ? 0 : cloud),
    0,
  )
  const cityPrecipitation = parseFloat((sumOfRain / 24).toFixed(2))
  const cloudCoverage = parseFloat((sumOfClouds / 24).toFixed(2))

  return (
    <div className="cityListElement">
      <Link className="cityLink" to={`/city/${cityName}`}>
        <p>{cityName}</p>
      </Link>

      <img className="weatherIcon" src={getWeatherIcon(cityPrecipitation, cloudCoverage)} alt="weather icon" />
      <p>{cityPrecipitation}mm</p>
      <p>
        {cityTempMax}/{cityTempMin} ℃
      </p>

      <label className="favorite-checkbox">
        <input type="checkbox" checked={isFavorite} onChange={toggleFavorite} className="hidden-checkbox" />
        <span className="star">&#9733;</span>
      </label>
    </div>
  )
}

export default CityListElement
