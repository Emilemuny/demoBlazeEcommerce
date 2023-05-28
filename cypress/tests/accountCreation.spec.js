/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('User Account SignUp:', function(){

    beforeEach(function() {
        cy.visit('/')
    })

    it('Should sign up a new user account and validate new user login', function() {
        const newUser = {userName: faker.internet.userName(), pwd: faker.internet.password()}
        cy.get('#signin2').click()
        cy.get('#signInModalLabel').should('have.text', 'Sign up')
        cy.get('#sign-username').clear().type(newUser.userName)
        cy.get('#sign-password').clear().type(newUser.pwd)
        cy.contains('[type="button"]', 'Sign up').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Sign up successful`)
          })
        cy.on('window:confirm', () => true)
        cy.get('#login2').click()
        cy.get('#logInModalLabel').should('have.text', 'Log in')
        cy.get('#loginusername').clear().type(newUser.userName)
        cy.get('#loginpassword').clear().type(newUser.pwd)
        cy.contains('[type="button"]', 'Log in').click()
        cy.get('#nameofuser').should('have.text', 'Welcome '+ newUser.userName)
        cy.contains('#logout2', 'Log out').should('be.visible')
    })

    it('Should not allow sign up with an existing account', function(){
        const existingUser = {userName: faker.internet.userName(), pwd: faker.internet.password()}
        cy.signup_via_API(existingUser.userName, existingUser.pwd)
        cy.get('#signin2').click()
        cy.get('#signInModalLabel').should('have.text', 'Sign up')
        cy.get('#sign-username').clear().type(existingUser.userName)
        cy.get('#sign-password').clear().type(existingUser.pwd)
        cy.contains('[type="button"]', 'Sign up').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`This user already exist.`)
          })
        cy.on('window:confirm', () => true) // Dismiss the alert
    })

    it('Should throw an error when trying to sign up without a username or password', function(){
        const newUser = {userName: faker.internet.userName(), pwd: faker.internet.password()}
        cy.get('#signin2').click()
        cy.get('#signInModalLabel').should('have.text', 'Sign up')
        cy.get('#sign-username').clear().type(newUser.userName)
        cy.get('#sign-password').click().clear()
        cy.contains('[type="button"]', 'Sign up').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Please fill out Username and Password.`)
          })
        cy.on('window:confirm', () => true) // Dismiss the alert
        cy.get('#sign-username').click().clear()
        cy.get('#sign-password').clear().type(newUser.pwd)
        cy.contains('[type="button"]', 'Sign up').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Please fill out Username and Password.`)
        })
        cy.on('window:confirm', () => true) // Dismiss the alert
    })

})