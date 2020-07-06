/// <reference types="cypress" />

context('Sign in', () => {
    beforeEach(() => {
        cy.visit('localhost:4000')
    })

    it('rejects invalid credentials', () => {
        const email = 'fake@gmail.com'
        const password = '12345678'

        cy.login(email, password)

        cy.url().should('include', '/login')
        cy.contains('email or password is invalid')
    })

    it('logs in with existing credentials', () => {
        const username = 'tony.hadjiivanov'
        const email = 'tony.hadjiivanov@gmail.com'
        const password = 'asdfasdf'

        cy.login(email, password)

        cy.contains('a.nav-link', username)
        cy.contains('a.nav-link', 'Your Feed')
    })
})
