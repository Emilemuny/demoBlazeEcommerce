/// <reference types="cypress" />

describe('User Login:', function(){

    beforeEach(function() {
        cy.visit('/')
    })
    it('Should login successfully with the correct credentials', function() {
        cy.get('#login2').click()
        cy.get('#logInModalLabel').should('have.text', 'Log in')
        cy.get('#loginusername').click().clear().type(Cypress.env('USERNAME'))
        cy.get('#loginpassword').click().clear().type(Cypress.env('PWD'))
        cy.contains('[type="button"]', 'Log in').click()
        cy.get('#nameofuser').should('have.text', 'Welcome '+ Cypress.env('USERNAME'))
        cy.contains('#logout2', 'Log out').should('be.visible')
    })
    it('Should throw an error when the password or username are incorrect', function() {
        cy.get('#login2').click()
        cy.get('#logInModalLabel').should('have.text', 'Log in')
        cy.get('#loginusername').clear().type(Cypress.env('USERNAME'))
        cy.get('#loginpassword').clear().type('IncorrectPassword')
        cy.contains('[type="button"]', 'Log in').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Wrong password.`)
          })
        cy.on('window:confirm', () => true) // Dismiss the alert
        cy.get('#loginusername').clear().type('IncorrectUsername')
        cy.get('#loginpassword').clear().type(Cypress.env('PWD'))
        cy.contains('[type="button"]', 'Log in').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Wrong username.`)
          })
        cy.on('window:confirm', () => true) // Dismiss the alert
    })
})