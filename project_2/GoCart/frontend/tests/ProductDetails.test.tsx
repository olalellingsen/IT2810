import { describe, test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ProductDetails from '../src/components/ProductDetails'
import React from 'react'
import { GET_PRODUCT_BY_ID } from '../src/utils/queryFunctions/getProduct'

const mockProduct = {
  name: 'Test Product',
  nutrition: [
    {
      display_name: 'Test Nutrition',
      amount: 10,
      unit: 'g',
    },
  ],
  store: {
    name: 'Test Store',
  },
  vendor: 'Test Vendor',
  weight: 100,
  weight_unit: 'kg',
  category: [
    {
      name: 'Test Category',
    },
  ],
  allergens: [
    {
      display_name: 'Test Allergen',
      contains: 'YES',
    },
  ],
  description: 'Test Description',
  image: '',
}

const mocks = [
  {
    request: {
      query: GET_PRODUCT_BY_ID,
      variables: { _id: '1' },
    },
    result: {
      data: {
        getProduct: mockProduct,
      },
    },
  },
]

const errorMock = [
  {
    request: {
      query: GET_PRODUCT_BY_ID,
      variables: { _id: '1' },
    },
    error: new Error('Failed to fetch product details'),
  },
]

describe('ProductDetails Component', () => {
  test('renders loading state', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductDetails productID="1" />
      </MockedProvider>,
    )

    expect(screen.getByText('Laster...')).toBeTruthy()
  })

  test('renders error state', async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <ProductDetails productID="1" />
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText('Feilmelding: Failed to fetch product details')).toBeTruthy()
    })
  })

  test('renders product details', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductDetails productID="1" />
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeTruthy()
      expect(screen.getByText('Test Nutrition:')).toBeTruthy()
      expect(screen.getByText('10 g')).toBeTruthy()
      expect(screen.getByText('Butikk:')).toBeTruthy()
      expect(screen.getByText('Test Store')).toBeTruthy()
      expect(screen.getByText('Forhandler:')).toBeTruthy()
      expect(screen.getByText('Test Vendor')).toBeTruthy()
      expect(screen.getByText('Vekt:')).toBeTruthy()
      expect(screen.getByText('100 kg')).toBeTruthy()
      expect(screen.getByText('Kategorier:')).toBeTruthy()
      expect(screen.getByText('Test Category')).toBeTruthy()
      expect(screen.getByText('Allergener:')).toBeTruthy()
      expect(screen.getByText('Test Allergen')).toBeTruthy()
      expect(screen.getByText('Beskrivelse')).toBeTruthy()
      expect(screen.getByText('Test Description')).toBeTruthy()
    })
  })
})
