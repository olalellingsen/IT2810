import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen) // Toggle the menu's open/closed state
  }

  return (
    <nav>
      <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className="logoContainer">
        <h2>
          <a href="/" className="linkstyle">
            WebDevWeather
          </a>
        </h2>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li className="navigationElement">
          <a href="/Home" className="linkstyle">
            Home
          </a>
        </li>
        <li className="navigationElement">
          <a href="/Favorites" className="linkstyle">
            Favourites
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
