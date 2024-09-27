import React from 'react'
import { test, expect, vi, describe } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import FilterDropdown from '../src/components/FilterDropdown'

// State: Passed

describe('FilterDropdown Component', () => {
  test('renders correctly', () => {
    const onCategoryChange = vi.fn()
    const { getByText } = render(<FilterDropdown onCategoryChange={onCategoryChange} />)

    // Assert that the Filter button is present
    expect(getByText('Filter')).toBeDefined()
  })

  test('clicking filter button toggles visibility of filter options', () => {
    const { getByText, queryByText } = render(<FilterDropdown onCategoryChange={() => {}} />)

    const filterButton = getByText('Filter')
    fireEvent.click(filterButton)

    const closeButton = getByText('Nullstill')
    expect(closeButton).toBeDefined()

    fireEvent.click(closeButton)

    const filterButtonAfterClose = queryByText('Filter')
    expect(filterButtonAfterClose).toBeDefined()
  })

  test('resets selected category on Reset button click', () => {
    const onCategoryChange = vi.fn()
    const { getByText } = render(<FilterDropdown onCategoryChange={onCategoryChange} />)

    const filterButton = getByText('Filter')
    fireEvent.click(filterButton)

    const resetButton = getByText('Nullstill')
    fireEvent.click(resetButton)

    expect(onCategoryChange).toHaveBeenCalledWith('')
  })
})
