// Searchbar component: A reusable input field for filtering items.
// Using the same searchbar component as in project_1

import { useState } from 'react'

interface SearchbarProps {
  // Callback function that will be called when the filter value changes.
  onFilter: (value: string) => void
}

// Define the Searchbar component as a functional component.
function Searchbar({ onFilter }: SearchbarProps) {
  // Initialize the 'filter' state using React's useState hook.
  const [filter, setFilter] = useState('')

  // Function to handle changes in the filter input field.
  function handleFilterChange(value: string) {
    // Update the 'filter' state with the new value.
    setFilter(value)

    // Call the 'onFilter' callback function to notify the parent component of the filter change.
    onFilter(value)
  }

  return (
    <div className="sm:w-1/2">
      {/* Input field for filtering with controlled value */}
      <input
        type="text"
        placeholder="Søk..."
        value={filter}
        // The onChange event handler is used to call the handleFilterChange function when the input value changes.
        onChange={(e) => handleFilterChange(e.target.value)}
        className="inputfield h-12
        placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
        data-testid="search-field"
      />
    </div>
  )
}

export default Searchbar
