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