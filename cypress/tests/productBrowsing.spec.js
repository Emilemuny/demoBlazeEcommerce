/// <reference types="cypress" />

xdescribe('Browsing The Store Main Categories:', function(){

    beforeEach(function() {
        cy.visit('/')
    })

    xit('Should browse products without using category filter', function() {
        cy.contains('.hrefch', 'Samsung').should('be.visible')
        cy.contains('.hrefch', 'Sony vaio i5').should('be.visible')
        cy.get('.card > .card-block > .card-title > .hrefch').should('have.length', '9')
    })

    xit('Should browse products by categories (Phones) ', function(){
        cy.contains('.list-group-item', 'Phones').click()
        cy.contains('.hrefch', 'Iphone 6 32gb').should('be.visible')
        cy.contains('.hrefch', 'Sony vaio i5').should('not.be.visible')
        cy.get('.hrefch').contains('Apple monitor 24').should('not.be.visible')
    })

    it('Should browse products by categories (Laptops) ', function(){
        cy.contains('.list-group-item', 'Laptops').click()
        cy.contains('.hrefch', 'Sony vaio i5', { timeout: 10000 }).should('be.visible')
        cy.contains('.hrefch', 'Iphone 6 32gb', { timeout: 10000 }).should('not.be.visible')
        cy.contains('.hrefch', 'Apple monitor 24').should('not.be.visible')
    })

    xit('Should browse products by categories (Monitors)', function(){
        cy.contains('.list-group-item', 'Monitors').click()
        cy.contains('.hrefch', 'Apple monitor 24').should('be.visible')
        cy.contains('.hrefch', 'Iphone 6 32gb').should('not.be.visible')
        cy.contains('.hrefch', 'Sony vaio i5').should('not.be.visible')
    })

    xit('should browse products with using the pagination (Previous & Next)', function() {
        cy.get('#next2').click()
        cy.contains('.hrefch', 'Apple monitor 24').should('be.visible')
        cy.get('#prev2').click()
        cy.contains('.hrefch', 'Iphone 6 32gb').should('be.visible')
    })

    xit('should browse products with using the pagination from a category (Previous & Next)', function() {
        cy.contains('.list-group-item', 'Phones').click()
        cy.contains('.hrefch', 'Iphone 6 32gb').should('be.visible')
        cy.get('#next2').click()
        cy.contains('.hrefch', 'Sony vaio i5').should('not.be.visible')
        cy.contains('.hrefch', 'MacBook Pro').should('be.visible')
        cy.get('#prev2').click()
        cy.contains('.hrefch', 'Iphone 6 32gb').should('be.visible')
        cy.contains('.hrefch', 'Sony vaio i5').should('not.be.visible')
        cy.contains('.hrefch', 'Apple monitor 24').should('not.be.visible')
        // CURRENTLY  a bug here!!
    })

})