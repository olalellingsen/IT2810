import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import ProductImage from '../src/components/ProductImage'

describe('ProductImage component', () => {
  test('renders product image with provided src and alt', () => {
    const src = 'https://bilder.ngdata.no/7035620025037/meny/large.jpg'
    const alt = 'Test Image'
    const { getByAltText } = render(<ProductImage src={src} alt={alt} />)

    // Check if the image is present with the given alt text
    const imageElement = getByAltText(alt)
    expect(imageElement).toBeInTheDocument()

    // Check if the image has the provided src
    expect(imageElement).toHaveAttribute('src', src)
  })
})
