import './CityWeek.css'
import Day from '../Day/Day'
import useWeatherHook from '../../utils/api_hooks/useWeatherHook'
import cityCoordinates from '../../utils/coordinates/cityCoordinates'

interface CityWeekProps {
  cityName: string
}

function CityWeek({ cityName }: CityWeekProps) {
  if (!useWeatherHook(cityCoordinates[cityName])) {
    // Handle the case where data is still loading or unavailable
    return <p>Loading weekly weather data...</p>
  }

  return (
    <div className="cityWeek">
      <Day cityName={cityName} day={1} />
      <Day cityName={cityName} day={2} />
      <Day cityName={cityName} day={3} />
      <Day cityName={cityName} day={4} />
      <Day cityName={cityName} day={5} />
      <Day cityName={cityName} day={6} />
    </div>
  )
}

export default CityWeek
