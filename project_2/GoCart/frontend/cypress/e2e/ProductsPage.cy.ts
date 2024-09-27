/// <reference types="cypress" />

describe('Products Page', () => {
  beforeEach(() => {
    // Go to the right page
    cy.visit('/ProductsPage')
    cy.get('[data-testid="products-page"]').should('exist')
  })

  it('displays products correctly using search', () => {
    // Type a search term in the search bar
    cy.get('[data-testid="search-field"]').type('Kylling')

    // Assert that the product list is rendered
    cy.get('[data-testid="product-list"]').should('be.visible')

    // Verify that a specific product is in the list
    cy.contains('Couscous Kylling 8mnd 190g Nestle').should('be.visible')
  })

  it('can move to adding products to the register', () => {
    // Click on the "Add product to register" button
    cy.get('[data-testid="add-product-to-register"]').should('exist')
    cy.get('[data-testid="add-product-to-register"]').click()

    // Assert that the Add Product page is displayed
    cy.url().should('include', '/AddCustomProduct')
  })

  it('allows sorting products', () => {
    // Click on the ascending sort button
    cy.get('[data-testid="sort-asc-button"]').should('exist')
    cy.get('[data-testid="sort-asc-button"]').click()

    // Assert that the products are sorted in ascending order
    cy.get('[data-testid="product-list"]').each(($product, index, $list) => {
      if (index < $list.length - 1) {
        const currentProduct = $product.text().trim()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nextProduct = ($list as any)
          .eq(index + 1)
          .text()
          .trim()
        expect(currentProduct <= nextProduct).to.be.true
      }
    })

    // Click on the decending sort button
    cy.get('[data-testid="sort-des-button"]').should('exist')
    cy.get('[data-testid="sort-des-button"]').click()

    // Assert that the products are sorted in ascending order
    cy.get('[data-testid="product-list"]').each(($product, index, $list) => {
      if (index < $list.length - 1) {
        const currentProduct = $product.text().trim()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nextProduct = ($list as any)
          .eq(index + 1)
          .text()
          .trim()
        expect(currentProduct >= nextProduct).to.be.true
      }
    })
  })
  it('allow filtering of products', () => {
    // Check if filter button exists and click
    cy.get('[data-testid="filter-button"]').should('exist')
    cy.get('[data-testid="filter-button"]').click()
    // Check if one of the categories exists and click
    cy.get('[data-testid="fruite-and-vegies"]').should('be.visible')
    cy.get('[data-testid="fruite-and-vegies"]').click()
    // Check if close button exist and click
    cy.get('[data-testid="close-button"]').should('be.visible')
    cy.get('[data-testid="close-button"]').click()
    // Check if product in category is visible
    cy.contains('Norrek Wokblanding 2,5kg').should('be.visible')

    // Check if the reset of the filtering button work
    cy.get('[data-testid="filter-button"]').should('exist')
    cy.get('[data-testid="filter-button"]').click()
    cy.get('[data-testid="reset-button"]').should('exist')
    cy.get('[data-testid="reset-button"]').click()
    cy.get('[data-testid="close-button"]').click()
    cy.get('[data-testid="product-654a23d4a609b87c60908e95"]').should('exist')
  })

  it('show product details', () => {
    // Check that product exists and click
    cy.get('[data-testid="product-654a23d4a609b87c60908e95"]').should('exist')
    cy.get('[data-testid="product-654a23d4a609b87c60908e95"]').click()
    // Check that Nutrition is shown when product is clicked
    cy.contains('Kalorier').should('exist')
    // TODO add test for close button on popup
  })
})
