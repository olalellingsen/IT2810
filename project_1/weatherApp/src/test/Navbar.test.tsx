import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar/Navbar' // Assuming Navbar component file location

describe('Navbar component', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  test('renders navigation elements and logo', () => {
    const homeLink = screen.getByText('Home')
    const favoritesLink = screen.getByText('Favourites')
    const logoLink = screen.getByText('WebDevWeather')

    expect(homeLink).toBeInTheDocument()
    expect(favoritesLink).toBeInTheDocument()
    expect(logoLink).toBeInTheDocument()
  })
})
