import './Search.css'
import React, { useState } from 'react'

interface SearchBarProps {
  onFilter: (filter: string) => void // Callback function for handling search filter changes
}

export const Search: React.FC<SearchBarProps> = ({ onFilter }) => {
  const [filter, setFilter] = useState('')

  // Handle changes to the search filter input
  const handleFilterChange = (value: string) => {
    setFilter(value) // Update the search filter state
    onFilter(value) // Call the provided callback function to handle filter changes
  }

  return (
    <div className="homeSearch">
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => {
          handleFilterChange(e.target.value) // Update the filter value on input change
        }}
      />
    </div>
  )
}
