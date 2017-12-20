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

        it('clears "Number of Guests" field', function(){
            cy.get('#id_event_form_guests')
              .type('20').should('have.value', '20')
              .clear()
              .should('have.value', '')
        })

        it('submits RAQ', function() {
            // Fills all "Event Details" fields
            cy.get('#id_event_form_guests')
              .type('20').should('have.value', '20')
            cy.get('#id_event_form_start_date')
              .type('01/28/2018', {delay: 100}).should('have.value', '01/28/2018')
            cy.get('#id_event_form_start_time').click()
            cy.get('.form__filter-button').contains('6:00 PM').click()

            // Clicks on the "Customize Your Event" button
            cy.get('.btn').last().should('contain', 'Customize Your Event').click()
            cy.contains('Tell us about your event')

            // Makes choices
            cy.get('#id_raq_event_form_budget')
              .type('3000').should('have.value', '3000')
            cy.get('[type="radio"]').check('14870').should('be.checked')
            cy.get('[type="radio"]').check('21512').should('be.checked')
            cy.get('[type="radio"]').check('39224').should('be.checked')
            cy.get('[type="radio"]').check('94473').should('be.checked')
            cy.get('[type="radio"]').check('12630').should('be.checked')
            cy.get('[type="radio"]', {delay: 100}).check('26').should('be.checked')

            // Presses "Continue"
            cy.get('.raq__continue').contains('Continue').click()
            cy.contains('Full Name')

            // Fills contact info and submits request to venue
            cy.get('.raq-user-form')
              .find('#id_raq_user_form_contact_name').type('Tom')
            cy.get('.raq-user-form')
              .find('#id_raq_user_form_email').type('black.tom@venuebook.com')
            cy.get('.raq-user-form')
              .find('#id_raq_user_form_phone').type('4012564321')
            cy.get('.raq-user-form')
              .find('.raq__button').click()
            cy.get('.vbconfirm__btn.btn.btn--action_positive').should('contain', 'Agree').click()
            cy.contains('Similar Venues')
        })
    })
})