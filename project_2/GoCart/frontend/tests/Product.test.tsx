import '@testing-library/jest-dom'
import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Product, { ProductProps } from '../src/components/Product'
import React from 'react'

const sampleProduct: ProductProps = {
  productName: 'Sample Product',
  productID: '1',
  productImage: '',
  increment: true,
  decrement: true,
  quantity: true,
  listView: false,
}

// Mock the ProductDetails component to prevent its rendering and functionality in the tests
vi.mock('../src/components/ProductDetails', () => {
  return {
    __esModule: true,
    default: vi.fn().mockReturnValue(null), // Mock ProductDetails component to return null
  }
})

// Mocking the react-router-dom context for testing
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(), // Mocking useNavigate if needed
}))

describe('Product Component', () => {
  test('renders Product correctly', async () => {
    // Test rendering of Product component
    const { getByText } = render(<Product {...sampleProduct} />)

    // Assert that the product name is rendered
    expect(getByText('Sample Product')).toBeTruthy()
  })

  test('increments product quantity when + button is clicked', async () => {
    const { getByText } = render(<Product {...sampleProduct} />)

    // Get the + button and simulate a click event
    const incrementButton = getByText('+')
    fireEvent.click(incrementButton)

    // Get the quantity display element
    const quantityDisplay = getByText('1') // Update this based on how your quantity is displayed

    // Assert that the quantity is incremented by 1
    expect(quantityDisplay.textContent).toBe('1') // Use .textContent to access the text content and perform assertions
  })

  test('decrements product quantity when - button is clicked', async () => {
    const { getByText } = render(<Product {...sampleProduct} />)

    // Get the - button and simulate a click event
    const decrementButton = getByText('-')
    fireEvent.click(decrementButton)

    // Get the quantity display element
    const quantityDisplay = getByText('0') // Update this based on how your quantity is displayed

    // Assert that the quantity is decremented by 1
    expect(quantityDisplay.textContent).toBe('0') // Use .textContent to access the text content and perform assertions
  })

  test('does not render increment and decrement buttons when props are false', async () => {
    const { queryByText } = render(<Product {...sampleProduct} increment={false} decrement={false} />)

    const incrementButton = queryByText('+')
    const decrementButton = queryByText('-')

    expect(incrementButton).toBeNull()
    expect(decrementButton).toBeNull()
  })
})
