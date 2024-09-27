// import weather icons
import rain from '../assets/rain.svg'
import sun from '../assets/sun.svg'
import cloud from '../assets/cloud.svg'
import sunCloud from '../assets/sunCloud.svg'

// fetch weather data from API and return the weather icon
function getWeatherIcon(percipitation: number, cloudCoverage: number) {
  if (percipitation >= 0.5 && cloudCoverage > 30) {
    return rain
  } else if (percipitation < 1 && cloudCoverage < 50) {
    return sun
  } else if (percipitation < 1 && cloudCoverage < 80) {
    return sunCloud
  } else {
    return cloud
  }
}

export default getWeatherIcon
