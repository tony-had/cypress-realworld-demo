/// <reference types="cypress" />

context('Sign up', () => {
    beforeEach(() => {
        cy.visit('localhost:4000')
    })

    it('rejects blank/short sign-up data', () => {
        const username = ''
        const email = ''
        const password = ''

        cy.signup(username, email, password)

        cy.url().should('include', '/register')
        cy.contains('username can\'t be blank')
        cy.contains('username is too short')
        cy.contains('email can\'t be blank')
        cy.contains('password can\'t be blank')
    })

    it('rejects other invalid sign-up data', () => {
        const username = 'onetwothreefourfivesix'
        const email = 'fake@gmail.com'
        const password = '1234567'

        cy.signup(username, email, password)

        cy.url().should('include', '/register')
        cy.contains('username is too long')
        cy.contains('email has already been taken')
        cy.contains('password is too short')
    })

    it('takes you to login page if you have an account', () => {
        cy.contains('a.nav-link', 'Sign up').click()

        cy.contains('Have an account?').click()
        cy.url().should('include', '/login')
    })

    // it('creates a new account' () => {
    //     // TODO
    //     // once a test backend is implemented for the demo
    //     // so that accounts can be deleted when needed
    // })
})
