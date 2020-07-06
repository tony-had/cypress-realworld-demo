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

    it('posts a new comment', () => {
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

        cy.get('textarea[ng-model="$ctrl.commentForm.body"]')
            .type('Noice!')
        cy.contains('button', 'Post Comment').click()

        // The assertion below fails
        // known bug - comments don't display
        cy.contains('p', 'Noice!')
    })

    it('deletes a comment', () => {
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

        cy.get('textarea[ng-model="$ctrl.commentForm.body"]')
            .type('Noice!')
        cy.contains('button', 'Post Comment').click()

        cy.get('i[ng-click="$ctrl.deleteCb()"]').click()
        // The assertion below fails
        // known bug - comments can't be deleted
        cy.get('comment').should('not.exist')
    })
})
