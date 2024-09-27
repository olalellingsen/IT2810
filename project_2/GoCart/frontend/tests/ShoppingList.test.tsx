import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ShoppingList from '../src/components/ShoppingList'
import React from 'react'

// State: Passed
// TODO: expand

describe('ShoppingList Component Tests', () => {
  test('renders ShoppingList component with title', async () => {
    const title = 'Test Shopping List'
    render(
      <MemoryRouter>
        <ShoppingList title={title} />
      </MemoryRouter>,
    )

    expect(screen.getByText(title)).toBeDefined()
  })
})
