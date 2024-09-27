import { useState, useEffect } from 'react'
import './Home.css'
import { Search } from '../../components/Search/Search'
import CityList from '../../components/CityList/CityList'
import CountryFilter from '../../components/CountryFilter/CountryFilter'
import cityCountries from '../../components/CountryFilter/cityCountries'

function Home() {
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  // Load selected country filter from sessionStorage on component mount
  useEffect(() => {
    const storedSelectedCountry = sessionStorage.getItem('selectedCountry')
    if (storedSelectedCountry !== null) {
      setSelectedCountry(storedSelectedCountry)
    }
  }, [])

  // Save selected country filter to sessionStorage whenever it changes
  useEffect(() => {
    // Check if selectedCountry is null or "All" and store it accordingly
    if (selectedCountry !== null && selectedCountry !== 'All') {
      sessionStorage.setItem('selectedCountry', selectedCountry)
    } else {
      sessionStorage.removeItem('selectedCountry') // Remove the stored value for "All"
    }
  }, [selectedCountry])

  const countries = Array.from(new Set(Object.values(cityCountries)))

  return (
    <div className="home">
      {/* Display the Search component to allow filtering by city name */}
      <Search onFilter={(value) => setFilter(value)} />
      {/* Display the CountryFilter component for country-based filtering */}
      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onSelectCountry={(country) => setSelectedCountry(country)}
      />
      {/* Display the CityList component to list cities based on filter and selected country */}
      <CityList filter={filter} showFavoritesOnly={false} selectedCountry={selectedCountry} />
    </div>
  )
}

export default Home
