import getWeatherIcon from '../../utils/getWeatherIcon'
import useWeatherHook from '../../utils/api_hooks/useWeatherHook'
import cityCoordinates from '../../utils/coordinates/cityCoordinates'
import './Day.css'

interface DayProps {
  cityName: string
  day: number // 1-6 days in the future
}

function Day({ cityName, day }: DayProps) {
  const { data: cityWeatherData, isLoading } = useWeatherHook(cityCoordinates[cityName])

  if (isLoading) {
    return <div>Loading weather data...</div>
  }

  if (!cityWeatherData.hourly || !Array.isArray(cityWeatherData.hourly.temperature_2m)) {
    return <div>Invalid weather data format for {cityName}</div>
  }

  const hourIndex = day * 24

  // Get the date string from the weather data
  const dateString = cityWeatherData?.hourly?.time[hourIndex]
  const date = new Date(dateString)

  // Get the day of the week for the specified day
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayIndex = date.getDay()
  const dayOfWeek = daysOfWeek[dayIndex]

  // Handle potential undefined values
  const hourlyTemperature = cityWeatherData.hourly?.temperature_2m || []
  const temperatures = hourlyTemperature.slice(0, 24)

  // Calculate the maximum and minimum temperatures for the city
  const cityTempMax = Math.max(...temperatures)
  const cityTempMin = Math.min(...temperatures)

  // Calculate the average precipitation and cloud coverage for the day
  let sumOfRain = 0
  let sumOfClouds = 0

  for (let i = hourIndex; i < hourIndex + 24; i++) {
    sumOfRain += cityWeatherData?.hourly?.rain[i]
    sumOfClouds += cityWeatherData?.hourly?.cloudcover[i]
  }

  const cityPrecipitation = parseFloat((sumOfRain / 24).toFixed(2))
  const cloudCoverage = parseFloat((sumOfClouds / 24).toFixed(2))

  return (
    <>
      <div className="day">
        <p>{dayOfWeek}</p>
        <img src={getWeatherIcon(cityPrecipitation, cloudCoverage)} width={40} height={40} alt="weather icon" />
        <p>{cityPrecipitation} mm</p>
        <p>
          {cityTempMax} / {cityTempMin}℃
        </p>
      </div>
      <span className="line"></span>
    </>
  )
}

export default Day
