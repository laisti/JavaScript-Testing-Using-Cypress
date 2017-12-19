//
// **** VenueBook Tests ****
//
// Author: Laima Stinskaite
// Date: 12/18/2017
//
// These tests were developed for sema4 company
// to demonstrate how to write tests in Cypress
//


describe('Test of VenueBook website', function() {
    it('title should consists of "VenueBook"', function() {
        cy.visit('https://venuebook.com')
        cy.title().should('include', 'VenueBook')
    })

    it('clicks the link "List Your Venue"', function() {
        cy.contains('List Your Venue').click()
        cy.url().should('include', '/signup/venue/')
    })

    context('Venue Profile Page', function(){
        beforeEach(function(){
            // Before any test open "Venue Profile Page"
            cy.visit('https://venuebook.com/venue/651/underground-coktail-bar')
        })

        it('clicks the link "View Photos"', function() {
            cy.contains('View photos').click()
            cy.url().should('include', '/photos/')
        })

        it('fills "Event Details" fields', function() {
            cy.get('#id_event_form_guests')
              .type('20').should('have.value', '20')
            cy.get('#id_event_form_start_date')
              .type('01/28/2018').should('have.value', '01/28/2018')
            cy.get('#id_event_form_start_time').click()
            cy.get('.form__filter-button').contains('5:30 PM').click()

        })
    })
})