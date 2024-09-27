import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import ConfirmationModal from '../src/components/ConfirmationModal'

describe('ConfirmationModal component', () => {
  test('renders confirmation modal with product name', () => {
    const productName = 'Product A'
    render(<ConfirmationModal productName={productName} />)

    const modalElement = screen.getByTestId('confirmation-modal')
    expect(modalElement).toBeInTheDocument()

    const textElement = screen.getByText(`"${productName}" har blitt lagt til i databasen!`)
    expect(textElement).toBeInTheDocument()
  })
})
