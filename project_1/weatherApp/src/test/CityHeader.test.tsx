import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CityHeader from '../components/CityHeader/CityHeader'

describe('CityHeader component', () => {
  const testProps = {
    cityName: 'Test City',
    cityTempMax: 25,
    cityTempMin: 15,
    cityPrecipitation: 10,
    cloudCoverage: 30,
  }

  test('renders city details correctly', () => {
    const { getByText, getByAltText } = render(<CityHeader {...testProps} />)

    const cityNameElement = getByText('Test City')
    expect(cityNameElement).toBeInTheDocument()

    const precipitationElement = getByText('10 mm')
    expect(precipitationElement).toBeInTheDocument()

    const temperatureElement = getByText('25 / 15℃')
    expect(temperatureElement).toBeInTheDocument()

    const weatherIconElement = getByAltText('icon')
    expect(weatherIconElement).toBeInTheDocument()
  })
})
