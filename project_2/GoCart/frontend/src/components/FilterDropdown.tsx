import React, { useState } from 'react'
import { X } from 'lucide-react'
import { SlidersHorizontal } from 'lucide-react'
import { RotateCcw } from 'lucide-react'

type FilterDropdownProps = {
  onCategoryChange: (category: string) => void
}

function FilterDropdown({ onCategoryChange }: FilterDropdownProps) {
  const [isFilterVisible, setFilterVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  function handleFilterClick() {
    setFilterVisible(!isFilterVisible)
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const category = event.target.value
    setSelectedCategory(event.target.value)

    // Call the callback function to pass the selected category to the parent component
    onCategoryChange(category)
  }

  function handleResetClick() {
    setSelectedCategory(null) // Reset selected category to null
    onCategoryChange('') // Notify the parent component about the reset (passing null)
  }

  return (
    <div className="flex">
      {!isFilterVisible && (
        // Filter button
        <button className="btn flex gap-2 text-xl" onClick={handleFilterClick} data-testid="filter-button">
          <SlidersHorizontal size={30} />
          Filter
        </button>
      )}

      {isFilterVisible && (
        <div className="sm:gap-4 absolute w-max darkMode lightMode border-2 border-primary rounded-lg p-2 text-xl z-0">
          <div className="flex justify-between mb-4">
            <button className="btn flex gap-1" onClick={handleFilterClick} data-testid="close-button">
              <X size={30} />
              Lukk
            </button>
            <button className="btn flex gap-1" onClick={handleResetClick} data-testid="reset-button">
              <RotateCcw size={30} />
              Nullstill
            </button>
          </div>

          {/* Checkboxes */}
          <div className="text-2xl grid grid-cols-1 xl:grid-cols-2">
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Frukt & grønt"
                checked={selectedCategory === 'Frukt & grønt'}
                onChange={handleCategoryChange}
                data-testid="fruite-and-vegies"
              />
              <label>Frukt & grønt</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Fisk & skalldyr"
                checked={selectedCategory === 'Fisk & skalldyr'}
                onChange={handleCategoryChange}
              />
              <label>Fisk & skalldyr</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Drikke"
                checked={selectedCategory === 'Drikke'}
                onChange={handleCategoryChange}
              />
              <label>Drikke</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Bakevarer og kjeks"
                checked={selectedCategory === 'Bakevarer og kjeks'}
                onChange={handleCategoryChange}
              />
              <label>Bakevarer og kjeks</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Kjøtt"
                checked={selectedCategory === 'Kjøtt'}
                onChange={handleCategoryChange}
              />
              <label>Kjøtt</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Kylling og fjærkre"
                checked={selectedCategory === 'Kylling og fjærkre'}
                onChange={handleCategoryChange}
              />
              <label>Kylling og fjærkre</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Meieri & egg"
                checked={selectedCategory === 'Meieri & egg'}
                onChange={handleCategoryChange}
              />
              <label>Meieri & egg</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Snacks & godteri"
                checked={selectedCategory === 'Snacks & godteri'}
                onChange={handleCategoryChange}
              />
              <label>Snacks & godteri</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Ost"
                checked={selectedCategory === 'Ost'}
                onChange={handleCategoryChange}
              />
              <label>Ost</label>
            </div>
            <div>
              <input
                type="radio"
                className="radio"
                name="category"
                value="Pålegg & frokost"
                checked={selectedCategory === 'Pålegg & frokost'}
                onChange={handleCategoryChange}
              />
              <label>Pålegg & frokost</label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
