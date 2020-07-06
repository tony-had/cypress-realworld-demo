/// <reference types="cypress" />

let username

// TODO: restore the database's state beforeEach test to a clean state
context('New article', () => {
    beforeEach(() => {
        username = 'tony.hadjiivanov'
        const email = 'tony.hadjiivanov@gmail.com'
        const password = 'asdfasdf'

        cy.visit('localhost:4000')
        cy.login(email, password)
    })

    it.only('rejects empty fields', () => {
        const title = ''
        const description = ''
        const body = ''
        const tag = ['thag', 'anothaone']

        cy.newArticle({
            title: title,
            description: description,
            body: body,
            tags: tag
        })

        cy.contains('title can\'t be blank')
        cy.contains('title is too short')
        cy.contains('description can\'t be blank')
        cy.contains('description is too short')
        cy.contains('body can\'t be blank')
    })

    it('creates a new article', () => {
        const title = 'Demo Title'
        const description = 'Demo Description'
        const body = '*italic* **bold**'
        const tag = ['thag', 'anothaone']

        cy.newArticle({
            title: title,
            description: description,
            body: body,
            tags: tag
        })
        cy.url().should('include', 'article')

        cy.contains('h1', title)
        cy.contains('em', 'italic')
        cy.contains('strong', 'bold')
        tag.forEach(tag => {
            cy.contains('li', tag)
        })

        cy.contains('a.nav-link', username).click()
        cy.contains('a.nav-link', 'My Articles').click()
        cy.contains('p', description)
    })
})
