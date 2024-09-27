import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Search } from '../components/Search/Search'

describe('Search component', () => {
  const onFilter = vi.fn()

  test('renders the search input correctly', () => {
    render(<Search onFilter={onFilter} />)
    const searchInput = screen.getByPlaceholderText('Search...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })

  test('calls onFilter with the search input value', () => {
    render(<Search onFilter={onFilter} />)
    const searchInput = screen.getByPlaceholderText('Search...')

    fireEvent.change(searchInput, { target: { value: 'London' } })

    expect(onFilter).toHaveBeenCalledWith('London')
  })

  test('updates the search input value', () => {
    render(<Search onFilter={onFilter} />)
    const searchInput = screen.getByPlaceholderText('Search...')

    fireEvent.change(searchInput, { target: { value: 'Paris' } })

    expect(searchInput).toHaveValue('Paris')
  })
})
