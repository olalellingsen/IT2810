import './CityDetails.css'
import CityHeader from '../../components/CityHeader/CityHeader'
import CityWeek from '../../components/CityWeek/CityWeek'
import cityCoordinates from '../../utils/coordinates/cityCoordinates'
import useWeatherHook from '../../utils/api_hooks/useWeatherHook'

interface CityDetailsProps {
  cityName: string
}

function CityDetails({ cityName }: CityDetailsProps) {
  const { data: cityWeatherData, isLoading } = useWeatherHook(cityCoordinates[cityName])

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

  // Calculate the average precipitation and cloud coverage for the day
  let sumOfRain = 0
  let sumOfClouds = 0
  for (let i = 0; i < 24; i++) {
    sumOfRain += cityWeatherData?.hourly?.rain[i]
    sumOfClouds += cityWeatherData?.hourly?.cloudcover[i]
  }

  const cityPersipitation = parseFloat((sumOfRain / 24).toFixed(2))
  const cloudCoverage = parseFloat((sumOfClouds / 24).toFixed(2))

  return (
    <div className="cityDetails">
      {/* Display the CityHeader component with weather details */}
      <CityHeader
        cityTempMax={cityTempMax}
        cityTempMin={cityTempMin}
        cityName={cityName}
        cloudCoverage={cloudCoverage}
        cityPersipitation={cityPersipitation}
      />
      {/* Display the CityWeek component for the weekly weather forecast */}
      <CityWeek cityName={cityName} />
    </div>
  )
}

export default CityDetails
