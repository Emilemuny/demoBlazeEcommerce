/// <reference types="cypress" />

describe('Shopping Cart:', function(){

    beforeEach(function() {
        cy.visit('/')
        cy.fixture('products').then((product) => {
            this.product = product
        })
    })

    context('Unauthenticated User:', function() {

        it('should validate adding item to the cart', function() {
            cy.contains('.hrefch', this.product[0].title).click()
            cy.url().should('contain', '/prod.html')
            cy.get('.product-content.product-deatil .name').should('have.text', this.product[0].title)
            cy.get('.product-content.product-deatil .price-container').should('contain', this.product[0].price)
            cy.get('.product-content.product-deatil .description #more-information > p').should('contain.text', this.product[0].description)
            cy.contains('.product-content.product-deatil .btn', 'Add to cart').click()
            cy.on('window:confirm', (str) => {
                expect(str).to.equal(`Product added`)
              })
            cy.on('window:confirm', () => true)
            cy.contains('#cartur', 'Cart').click()
            cy.url().should('contain', '/cart.html')
            cy.contains('tbody>tr>td', this.product[0].title).should('be.visible')
            cy.contains('tbody>tr>td', this.product[0].price).should('be.visible')
            cy.get('#totalp').should('contain', this.product[0].price)
        })
        it('should remove item from the cart', function() {
            cy.addItemToCart_UI(this.product[1])
            cy.contains('.success > td > a', 'Delete').click()
            cy.get('tbody>tr').should('not.exist')
            cy.get('#totalp').should('be.empty')
        })
        it('should verify items in the cart persists when revisiting the site', function() {
            cy.addItemToCart_UI(this.product[1])
            cy.reload()
            cy.visit('/')
            cy.contains('#cartur', 'Cart').click()
            cy.url().should('contain', '/cart.html')
            cy.contains('tbody>tr>td', this.product[1].title).should('be.visible')
            cy.contains('tbody>tr>td', this.product[1].price).should('be.visible')
            cy.get('#totalp').should('contain', this.product[1].price)
        })
    })

    context('Authenticated User:', function() {

        it('should validate cart items clears when user logs out and persists when user returns back', function() {
            cy.login_via_UI(Cypress.env('USERNAME'), Cypress.env('PWD'))
            cy.clearCart_via_UI(Cypress.env('USERNAME'))
            cy.addItemToCart_UI(this.product[1])
            cy.contains('#logout2', 'Log out').click()
            cy.contains('#login2', 'Log in').should('be.visible')
            cy.contains('#cartur', 'Cart').click()
            cy.url().should('contain', '/cart.html')
            cy.get('tbody>tr').should('not.exist')
            cy.get('#totalp').should('be.empty')
            cy.login_via_UI(Cypress.env('USERNAME'), Cypress.env('PWD'))
            cy.url().should('contain', '/cart.html')
            cy.contains('tbody>tr>td', this.product[1].title).should('be.visible')
            cy.contains('tbody>tr>td', this.product[1].price).should('be.visible')
            cy.get('#totalp').should('contain', this.product[1].price)
        })
        it('should validate removed cart items do not persists when user returns back', function() {
            cy.login_via_UI(Cypress.env('USERNAME'), Cypress.env('PWD'))
            cy.clearCart_via_UI(Cypress.env('USERNAME'))
            cy.addItemToCart_UI(this.product[1])
            cy.contains('.success > td > a', 'Delete').click()
            cy.get('tbody>tr').should('not.exist')
            cy.get('#totalp').should('be.empty')
            cy.contains('#logout2', 'Log out').click()
            cy.contains('#login2', 'Log in').should('be.visible')
            cy.login_via_UI(Cypress.env('USERNAME'), Cypress.env('PWD'))
            cy.contains('#cartur', 'Cart').click()
            cy.url().should('contain', '/cart.html')
            cy.get('tbody>tr').should('not.exist')
            cy.get('#totalp').should('be.empty')
        })
        xit('should validate user A does not see user B cart items', function() {

        })
    })
})