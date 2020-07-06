# Cypress RealWorld demo

Fork of [RealWorld example app](https://github.com/gothinkster/angularjs-realworld-example-app) with added Cypress end-to-end tests.

The tests can be found in `cypress/integration`:
- `article.spec.js` - creating a new blog article
- `comment.spec.js` - posting/deleting a comment on an article
- `login.spec.js` - logging in via the UI
- `settings.spec.js` - updating user profile
- `signup.spec.js` - registering a new profile

Several helper functions have been created for frequently used funcitonality, such as signing up, logging in, logging out, updating the account and posting an article. Those can be found in `cypress/support/commands.js`.

# Getting started

1. Clone repo
2. `npm install`
3. `gulp`

Make sure you have gulp installed globally (`npm install -g gulp`)

# Running the tests

1. (`gulp` to start serving the app)
2. `npx cypress open`
3. Run all specs

# TODO

- [ ] implement a test API with database
- [ ] write integration tests for the API
- [ ] turn all `beforeEach` set-up functions into API calls
- [ ] add `data-cy` attributes to elements under test to make tests more robust
- [ ] measure code coverage
