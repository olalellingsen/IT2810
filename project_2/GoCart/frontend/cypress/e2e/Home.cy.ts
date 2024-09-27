/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    // Go to the home page
    cy.visit('/')
  })

  it('renders the ShoppingList component', () => {
    // Assert that the ShoppingList component is rendered
    cy.get('[data-testid="cypress-ShoppingList"]', { withinSubject: null }).should('exist')
    cy.get('[data-testid="add-products-button"]').should('exist')
  })

  it('add product to shopping list', () => {
    // Check that the add product button exists
    cy.get('[data-testid="add-products-button"]').click()

    // Assert that the Add Product page is displayed
    cy.url().should('include', '/Addproduct')
    // Check for a spesifick product (first product in database)
    cy.get('[data-testid="product-654a23d4a609b87c60908e95"]').should('exist')
    // Check if increment button exist
    cy.get('[data-testid="increment-button-654a23d4a609b87c60908e95"]').should('exist')
    // Increment 3 times and decrement 1
    cy.get('[data-testid="increment-button-654a23d4a609b87c60908e95"]').click()
    cy.get('[data-testid="increment-button-654a23d4a609b87c60908e95"]').click()
    cy.get('[data-testid="increment-button-654a23d4a609b87c60908e95"]').click()
    cy.get('[data-testid="decrement-button-654a23d4a609b87c60908e95"]').click()

    // Go back to home page
    cy.get('[data-testid="back-to-shopping-list-button"]').click()
    cy.get('[data-testid="cypress-ShoppingList"]', { withinSubject: null }).should('exist')
    // Check if added product is dispalyed
    cy.get('[data-testid="product-654a23d4a609b87c60908e95"]').should('exist')
    // Check if displaying the right number
    cy.get('[data-testid="quantity-654a23d4a609b87c60908e95"]').contains('2')
  })
})
