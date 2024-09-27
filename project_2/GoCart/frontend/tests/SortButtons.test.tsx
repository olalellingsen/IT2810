import React from 'react'
import { describe, test, vi, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import SortButtons from '../src/components/SortButtons'

// State: Passed

describe('SortButtons component', () => {
  test('renders with default ascending order', () => {
    const onSortAscMock = vi.fn()
    const onSortDescMock = vi.fn()

    const { getByLabelText } = render(<SortButtons onSortAsc={onSortAscMock} onSortDesc={onSortDescMock} />)

    // Check if the buttons are rendered
    const ascButton = getByLabelText('Sort on ascending')
    const descButton = getByLabelText('Sort on decending')

    // Check if the default ascending order is set
    expect(onSortAscMock).toHaveBeenCalledTimes(1)
    expect(onSortDescMock).not.toHaveBeenCalled()

    // Simulate button clicks
    fireEvent.click(descButton)
    expect(onSortDescMock).toHaveBeenCalledTimes(1)
    expect(onSortAscMock).toHaveBeenCalledTimes(1)

    fireEvent.click(ascButton)
    expect(onSortAscMock).toHaveBeenCalledTimes(2)
    expect(onSortDescMock).toHaveBeenCalledTimes(1)
  })

  test('handles multiple consecutive clicks on ascending and descending buttons', () => {
    const onSortAscMock = vi.fn()
    const onSortDescMock = vi.fn()

    const { getByLabelText } = render(<SortButtons onSortAsc={onSortAscMock} onSortDesc={onSortDescMock} />)

    const ascButton = getByLabelText('Sort on ascending')
    const descButton = getByLabelText('Sort on decending')

    // Simulate multiple consecutive clicks on both buttons
    fireEvent.click(descButton)
    fireEvent.click(descButton)
    fireEvent.click(ascButton)
    fireEvent.click(ascButton)
    fireEvent.click(ascButton)

    // Ensure the expected number of calls for each handler function
    // 1 because desc is called after asc on mount, while several clicks won't count
    expect(onSortDescMock).toHaveBeenCalledTimes(1)
    // 2 because asc is called on mount, and clicked again after desc, while several clicks won't count
    expect(onSortAscMock).toHaveBeenCalledTimes(2)
  })
})
