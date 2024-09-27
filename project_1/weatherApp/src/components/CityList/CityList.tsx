import './CityList.css'
import CityListElement from '../CityListElement/CityListElement'
import cityCountries from '../CountryFilter/cityCountries'

interface CityListProps {
  filter: string
  showFavoritesOnly: boolean
  selectedCountry: string | null
}

function CityList({ filter, showFavoritesOnly, selectedCountry }: CityListProps) {
  const cities = [
    'Oslo',
    'Bergen',
    'Stavanger',
    'Trondheim',
    'Stockholm',
    'København',
    'Helsinki',
    'Berlin',
    'Paris',
    'London',
  ]

  // Retrieve favorites from sessionStorage
  const favorites: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const pre = localStorage.key(i)
    const key = String(pre)
    const value = localStorage.getItem(key)

    // Check if the value is 'true' (favorite)
    if (value === 'true') {
      favorites.push(key)
    }
  }

  // Function to get the country of a city
  const getCountryForCity = (city: string) => {
    return cityCountries[city] || ''
  }

  // Filter cities based on favorites, filter text and selected country
  const filteredCities = cities.filter((city) => {
    const country = getCountryForCity(city)

    if (showFavoritesOnly) {
      return favorites.includes(city)
    } else if (selectedCountry === null) {
      return city.toLowerCase().includes(filter.toLowerCase())
    } else {
      return city.toLowerCase().includes(filter.toLowerCase()) && country === selectedCountry
    }
  })

  return (
    <div className="cityList">
      {filteredCities.map((cityName, index) => {
        return <CityListElement key={index} cityName={cityName} />
      })}
    </div>
  )
}

export default CityList
