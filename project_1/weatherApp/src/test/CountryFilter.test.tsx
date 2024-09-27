import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CountryFilter from '../components/CountryFilter/CountryFilter'

describe('CountryFilter component', () => {
  const countries = ['USA', 'Canada', 'UK', 'Australia']
  const selectedCountry = 'Canada'
  const onSelectCountry = vi.fn()

  test('renders the country buttons correctly', () => {
    render(<CountryFilter countries={countries} selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} />)

    const allButton = screen.getByText('All')
    const countryButtons = countries.map((country) => screen.getByText(country))

    expect(allButton).toBeInTheDocument()
    countryButtons.forEach((button) => {
      expect(button).toBeInTheDocument()
    })
  })

  test('selects a country when its button is clicked', () => {
    render(<CountryFilter countries={countries} selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} />)

    const ukButton = screen.getByText('UK')
    fireEvent.click(ukButton)

    expect(onSelectCountry).toHaveBeenCalledWith('UK')
  })

  test('clears the selected country when "All" button is clicked', () => {
    render(<CountryFilter countries={countries} selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} />)

    const allButton = screen.getByText('All')
    fireEvent.click(allButton)

    expect(onSelectCountry).toHaveBeenCalledWith(null)
  })
})
