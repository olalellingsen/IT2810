import { Fragment } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useParams } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import CityDetails from './pages/CityDetails/CityDetails'

function App() {
  return (
    <Fragment>
      {/* Display the Navbar component for navigation */}
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/city/:cityName" element={<CityDetailsWrapper />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>
  )
}

function CityDetailsWrapper() {
  const { cityName = '' } = useParams() // Extract the cityName from the route parameters

  return <CityDetails cityName={cityName} /> // Render the CityDetails component with the extracted cityName
}

export default App
