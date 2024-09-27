/// <reference types="cypress" />


describe('Add Custom Product Page', () => {
  beforeEach(() => {
    cy.visit('/AddCustomProduct')
  })
  it('allows going back', () => {
    // Check that the "Back to products" button exist and click the button
    cy.get('[data-testid="back-to-products-button"]').should('exist')
    cy.get('[data-testid="back-to-products-button"]').click()

    // Check that the product page element is rendered
    cy.get('[data-testid="products-page"]').should('exist')
    // Check that the url is correct
    cy.url().should('include', '/ProductsPage')
  })

  it('allows adding a custom product', () => {
    // Type the product name in the input field
    cy.get('.inputfield').type('Example Product')

    // Toggle and fill the categories section
    cy.get('[data-testid="add-categories"]').click()
    cy.get('.inputfield').eq(1).type('Category1')
    cy.get('.inputfield').eq(2).type('Category2')
    cy.get('.inputfield').eq(3).type('Category3')
    cy.get('.inputfield').eq(4).type('Category4')

    // Toggle and fill the nutrition section
    cy.get('[data-testid="add-nutrition"]').click()
    cy.get('.inputfield').eq(1).type('100') // Kcal
    cy.get('.inputfield').eq(2).type('10') // Fat
    cy.get('.inputfield').eq(3).type('20') // Carbohydrates
    cy.get('.inputfield').eq(4).type('30') // Proteins
    cy.get('.inputfield').eq(5).type('1') // Salt
    cy.get('.inputfield').eq(6).type('15') // Sugar

    // Toggle and fill the other info section
    cy.get('[data-testid="add-other-info"]').click()
    cy.get('.inputfield').eq(1).type('StoreName')
    cy.get('.inputfield').eq(2).type('BrandName')
    cy.get('.textarea').type('Additional information for the product.')

    // Click the "Add product" button
    cy.get('[data-testid="add-product"]').click()

    // Assert that the confirmation modal is visible
    // TODO endre når jeg vet hvordan onfirmation ser ut
    cy.get('[data-testid="cypress-modal"]').should('be.visible')
    cy.get('[data-testid="cypress-modal"]').contains('Example Product').should('be.visible')
  })
})
