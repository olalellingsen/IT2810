import React from 'react'
import './CountryFilter.css'

interface CountryFilterProps {
  countries: string[] // List of available countries
  selectedCountry: string | null // Currently selected country or 'All'
  onSelectCountry: (country: string | null) => void // Callback function to handle country selection
}

const CountryFilter: React.FC<CountryFilterProps> = ({ countries, selectedCountry, onSelectCountry }) => {
  return (
    <div className="countryFilter">
      <button
        className={`countryButton ${selectedCountry === null ? 'active' : ''}`}
        onClick={() => onSelectCountry(null)} // Clicking the "All" button clears the selected country
      >
        All
      </button>
      {countries.map((country, index) => (
        <button
          key={index}
          className={`countryButton ${selectedCountry === country ? 'active' : ''}`}
          onClick={() => onSelectCountry(country)} // Clicking a country button selects the corresponding country
        >
          {country}
        </button>
      ))}
    </div>
  )
}

export default CountryFilter
