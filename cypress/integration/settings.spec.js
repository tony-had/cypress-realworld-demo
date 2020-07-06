/// <reference types="cypress" />

let email
let password

context('Settings', () => {
    beforeEach(() => {
        // TODO: turn this into an API request once the test backend is implemented
        const defaultPicUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg'
        const username = 'tony.hadjiivanov'
        const bio = ''
        email = 'tony.hadjiivanov@gmail.com'
        password = 'asdfasdf'

        cy.visit('localhost:4000')
        cy.login(email, password)
        cy.updateAccount({
            profilePicUrl: defaultPicUrl,
            username: username,
            bio: bio,
            email: email,
            password: password
        })
    })

    it('changes profile info', () => {
        const newPicUrl = 'https://cdn.emojidex.com/emoji/seal/dancing_hot_dog.png'
        const newUsername = 'tony.stafidoff'
        const newBio = 'Some things'
        const newEmail = 'tony.stafidoff@gmail.com'
        const newPassword = '12341234'

        cy.updateAccount({
            profilePicUrl: newPicUrl,
            username: newUsername,
            bio: newBio,
            email: newEmail,
            password: newPassword
        })
        // check email and password
        cy.logout()
        cy.login(newEmail, newPassword)

        // TODO: remove this once the test backend is implemented and the
        // database can be reset before each test
        cy.updateAccount({
            email: email,
            password: password
        })

        // check profile pic
        cy.get('img.user-pic').should('have.attr', 'src').should('eq', newPicUrl)
        // The assertion below fails
        // known bug - the big user image does not update
        cy.get('img.user-img').should('have.attr', 'src').should('eq', newPicUrl)

        // check user name
        cy.url().should('include', newUsername)
        cy.contains('a.nav-link', newUsername)

        // check bio
        cy.contains('a.nav-link', 'Settings').click()
        // The assertion below fails
        // known bug - bio does not update
        cy.get('textarea[ng-model="$ctrl.formData.bio"]').should('have.text', newBio)
    })

    it('logs out', () => {
        cy.logout()

        cy.contains('a.nav-link', 'Sign in')
    })
})
