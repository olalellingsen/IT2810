import './CityHeader.css'
import getWeatherIcon from '../../utils/getWeatherIcon'

type CityHeaderProps = {
  cityName: string
  cityTempMax: number
  cityTempMin: number
  cityPrecipitation: number
  cloudCoverage: number
}

function CityHeader({ cityName, cityTempMax, cityTempMin, cityPrecipitation, cloudCoverage }: CityHeaderProps) {
  return (
    // Render the CityHeader component with the following elements
    <div className="cityHeader">
      <h3>{cityName}</h3>
      <img src={getWeatherIcon(cityPrecipitation, cloudCoverage)} alt="icon" />
      <p>{cityPrecipitation} mm</p>
      <p>
        {cityTempMax} / {cityTempMin}℃
      </p>
    </div>
  )
}

export default CityHeader
