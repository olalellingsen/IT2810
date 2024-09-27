import React from 'react'
import { test, describe, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import ModeToggleBtn from '../src/components/ModeToggleBtn'

// State: Passed

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // Set the default value as needed for your test
    media: query,
    onchange: null,
    addListener: vi.fn(), // You can add more methods as needed for testing different scenarios
    removeListener: vi.fn(),
  })),
})

describe('ModeToggleBtn Component', () => {
  test('renders correctly', () => {
    const { getByLabelText } = render(<ModeToggleBtn />)

    // Assert that the button for toggling dark/light mode is present
    expect(getByLabelText('Toggle dark/light mode')).toBeDefined()
  })

  test('toggles between dark and light mode', () => {
    const { getByLabelText } = render(<ModeToggleBtn />)

    const toggleBtn = getByLabelText('Toggle dark/light mode')
    fireEvent.click(toggleBtn) // Toggles to dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    fireEvent.click(toggleBtn) // Toggles to light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  test('applies default mode based on prefers-color-scheme', () => {
    // Mock localStorage without a theme preference
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
      },
      writable: true,
    })

    render(<ModeToggleBtn />)

    // Assert that the mode is applied based on prefers-color-scheme
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    // You can also simulate prefers-color-scheme change here and re-render the component to test its impact
  })

  test('toggles correctly on media query change', () => {
    // Mock matchMedia to simulate a media query change
    const mockMatchMedia = vi.fn().mockImplementationOnce((query) => ({
      matches: true, // Simulate change in media query
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    const { getByLabelText } = render(<ModeToggleBtn />)

    const toggleBtn = getByLabelText('Toggle dark/light mode')
    fireEvent.click(toggleBtn) // Toggles to dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    // Re-render the component after the media query change
    render(<ModeToggleBtn />)

    fireEvent.click(toggleBtn) // Toggles to light mode based on the updated media query
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
