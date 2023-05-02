// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login_via_API', (username, pwd) => {
    cy.request('POST', Cypress.env('login_endpoint'), {
      body: {"username": username, "password": pwd}
    }).then((response) => {
      expect(response).property('status').to.equal(200) // Login Success
    })
})

Cypress.Commands.add('signup_via_API', (username, pwd) => {
  cy.request('POST', Cypress.env('signup_endpoint'), {
    body: {"username": username, "password": pwd}
  }).then((response) => {
    expect(response).property('status').to.equal(200) // Login Success. When it is unsuccessful, it returns something like 70
  })
})

Cypress.Commands.add('addItemToCart_UI', (product) => {
  cy.contains('.hrefch', product.title).click()
  cy.url().should('contain', '/prod.html')
  cy.get('.product-content.product-deatil .name').should('contain.text', product.title)
  cy.get('.product-content.product-deatil .price-container').should('contain', product.price)
  cy.get('.product-content.product-deatil .description #more-information > p').should('contain.text', product.description)
  cy.contains('.product-content.product-deatil .btn', 'Add to cart').click()
  cy.contains('#cartur', 'Cart').click()
  cy.url().should('contain', '/cart.html')
  cy.contains('tbody>tr>td', product.title).should('be.visible')
  cy.contains('tbody>tr>td', product.price).should('be.visible')
  cy.get('#totalp').should('contain', product.price)
})

Cypress.Commands.add('login_via_UI', (username, pwd) => {
  cy.get('#login2').click()
  cy.get('#logInModalLabel').should('have.text', 'Log in')
  cy.get('#loginusername').click().clear().type(username)
  cy.get('#loginpassword').click().clear().type(pwd)
  cy.contains('[type="button"]', 'Log in').click()
  cy.get('#nameofuser').should('have.text', 'Welcome '+ username)
  cy.contains('#logout2', 'Log out').should('be.visible')
})

Cypress.Commands.add('clearCart_via_API', (username) => {
  cy.request('POST', Cypress.env('deleteCart_endpoint'), {
    data: JSON.stringify({ "cookie": username })
  }).then((response) => {
    expect(response).property('status').to.equal(200)
  })
})

Cypress.Commands.add('clearCart_via_UI', (username) => {
  cy.contains('#cartur', 'Cart').click()
  cy.url().should('contain', '/cart.html')
  cy.request('POST', Cypress.env('deleteCart_endpoint'), {
    cookie: username
  }).then((response) => {
    expect(response).property('status').to.equal(200)
    cy.get('tbody>tr').should('not.exist')
    cy.get('#totalp').should('be.empty')
  })
  cy.visit('/')
})