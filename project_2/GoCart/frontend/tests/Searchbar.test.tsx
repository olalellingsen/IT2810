import { describe, test, vi } from 'vitest'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Searchbar from '../src/components/Searchbar'

// State: Passed

describe('Searchbar Component', () => {
  test('calls onFilter callback with correct value', async ({ expect }) => {
    const mockFilterHandler = vi.fn()

    const { getByPlaceholderText } = render(<Searchbar onFilter={mockFilterHandler} />)

    const searchInput = getByPlaceholderText('Søk...')
    fireEvent.change(searchInput, { target: { value: 'Test' } })

    expect(mockFilterHandler).toHaveBeenCalledWith('Test')
  })

  test('calls onFilter callback with empty string when input is emptied', async ({ expect }) => {
    const mockFilterHandler = vi.fn()

    const { getByPlaceholderText } = render(<Searchbar onFilter={mockFilterHandler} />)

    const searchInput = getByPlaceholderText('Søk...')
    fireEvent.change(searchInput, { target: { value: 'Test' } })
    fireEvent.change(searchInput, { target: { value: '' } })

    expect(mockFilterHandler).toHaveBeenCalledWith('')
  })

  test('calls onFilter callback with different input values', async ({ expect }) => {
    const mockFilterHandler = vi.fn()

    const { getByPlaceholderText } = render(<Searchbar onFilter={mockFilterHandler} />)

    const searchInput = getByPlaceholderText('Søk...')
    fireEvent.change(searchInput, { target: { value: 'Apple' } })

    expect(mockFilterHandler).toHaveBeenCalledWith('Apple')

    fireEvent.change(searchInput, { target: { value: 'Banana' } })

    expect(mockFilterHandler).toHaveBeenCalledWith('Banana')
  })
})
