import { useState } from 'react'
import './Favorites.css'
import CityList from '../../components/CityList/CityList'

function Favorites() {
  const [filter] = useState('')

  return (
    <div className="favorite">
      {/* Display the CityList component to show favorite cities */}
      <CityList selectedCountry={''} filter={filter} showFavoritesOnly={true} />
    </div>
  )
}

export default Favorites
