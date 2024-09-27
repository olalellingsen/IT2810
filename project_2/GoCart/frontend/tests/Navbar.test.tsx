import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import React from 'react'
import { beforeAll, describe, expect, test, vi } from 'vitest'

// Mock window.matchMedia before running tests
beforeAll(() => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })
})

describe('Navbar component', () => {
  test('renders Navbar component with title', () => {
    const title = 'My Website'
    render(
      <Router>
        <Navbar title={title} />
      </Router>,
    )

    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  test('displays home and browse buttons in mobile view', () => {
    const title = 'My Website'
    render(
      <Router>
        <Navbar title={title} />
      </Router>,
    )

    const homeButton = screen.getByAltText('Hjem')
    expect(homeButton).toBeInTheDocument()

    const browseButton = screen.getByAltText('Produkter')
    expect(browseButton).toBeInTheDocument()
  })

  test('displays links to home and products in desktop view', () => {
    const title = 'My Website'
    render(
      <Router>
        <Navbar title={title} />
      </Router>,
    )

    const homeLink = screen.getByText('Hjem')
    expect(homeLink).toBeInTheDocument()

    const productsLink = screen.getByText('Produkter')
    expect(productsLink).toBeInTheDocument()
  })
})
