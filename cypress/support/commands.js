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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("signup", (username, email, password) => {
    cy.contains('a.nav-link', 'Sign up').click()

    if (username !== '') {
        cy.get('input[ng-model="$ctrl.formData.username"]')
            .type(username)
    }
    if (email !== '') {
        cy.get('input[ng-model="$ctrl.formData.email"]')
            .type(email)
    }
    if (password !== '') {
        cy.get('input[ng-model="$ctrl.formData.password"]')
            .type(password)
    }
    cy.contains('button', 'Sign up').click()
})

Cypress.Commands.add("login", (email, password) => {
    cy.contains('a.nav-link', 'Sign in').click()

    if (email !== '') {
        cy.get('input[ng-model="$ctrl.formData.email"]')
            .type(email)
    }
    if (password !== '') {
        cy.get('input[ng-model="$ctrl.formData.password"]')
            .type(password)
    }
    cy.contains('button', 'Sign in').click()
})

Cypress.Commands.add("logout", () => {
    cy.contains('a.nav-link', 'Settings').click()

    cy.get('button[ng-click="$ctrl.logout()"]').click()
})

Cypress.Commands.add("updateAccount", (userData) => {
    cy.contains('a.nav-link', 'Settings').click()

    if (typeof userData.profilePicUrl !== 'undefined'
        && userData.profilePicUrl !== '') {
        cy.get('input[ng-model="$ctrl.formData.image"]')
            .clear()
            .type(userData.profilePicUrl)
    }

    if (typeof userData.username !== 'undefined'
        && userData.username !== '') {
        cy.get('input[ng-model="$ctrl.formData.username"]')
            .clear()
            .type(userData.username)
    }

    if (typeof userData.bio !== 'undefined') {
        if (userData.bio !== '') {
            cy.get('textarea[ng-model="$ctrl.formData.bio"]')
                .clear()
                .type(userData.bio)
        } else {
            cy.get('textarea[ng-model="$ctrl.formData.bio"]')
                .clear()
        }
    }

    if (typeof userData.email !== 'undefined'
        && userData.email !== '') {
        cy.get('input[ng-model="$ctrl.formData.email"]')
            .clear()
            .type(userData.email)
    }

    if (typeof userData.password !== 'undefined'
        && userData.password !== '') {
        cy.get('input[ng-model="$ctrl.formData.password"]')
            .type(userData.password)
    }

    cy.contains('button', 'Update Settings').click()
    cy.url().should('include', '@')
})

Cypress.Commands.add("newArticle", (articleData) => {
    cy.url().then(url => {
        if (!url.includes('editor')) {
            cy.get('a[ui-sref="app.editor"]').click()
        }
    })

    if (typeof articleData.title !== 'undefined') {
        if (articleData.title !== '') {
            cy.get('input[ng-model="$ctrl.article.title"]')
                .type(articleData.title)
        }
    }
    if (typeof articleData.description !== 'undefined') {
        if (articleData.description !== '') {
            cy.get('input[ng-model="$ctrl.article.description"]')
                .type(articleData.description)
        }
    }
    if (typeof articleData.body !== 'undefined') {
        if (articleData.body !== '') {
            cy.get('textarea[ng-model="$ctrl.article.body"]')
                .type(articleData.body)
        }
    }
    if (typeof articleData.tags !== 'undefined') {
        articleData.tags.forEach(tag => {
            cy.get('input[ng-model="$ctrl.tagField"]')
                .type(tag)
                .type('{enter}')
        })
    }

    cy.get('button[ng-click="$ctrl.submit()"').click()
})
