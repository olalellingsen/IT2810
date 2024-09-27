import '@testing-library/jest-dom'
import { describe, expect, test } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Modal from '../src/components/Modal'

describe('Modal component', () => {
  test('renders modal with provided text', () => {
    const modalText = 'This is a test modal'
    render(<Modal text={modalText} />)

    const modalElement = screen.getByTestId('cypress-modal')
    expect(modalElement).toBeInTheDocument()

    const textElement = screen.getByText(modalText)
    expect(textElement).toBeInTheDocument()
  })
})
