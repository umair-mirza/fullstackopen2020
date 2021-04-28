// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { setToken } from "../../src/services/blogs"

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user1 = {
            username: 'testing',
            password: 'Abc@12345',
            name: 'Testing User'
        }

        const user2 = {
            username: 'testing2',
            password: 'Abc@12345',
            name: 'Testing User 2'
        }

        cy.request('POST', 'http://localhost:3003/api/users', user1)
        cy.request('POST', 'http://localhost:3003/api/users', user2)
        cy.visit('http://localhost:3000')
    })

    it('displays login form by default', function() {
        cy.contains('username')
    })

    describe('Login', function() {
        it('Logins with correct credentials', function() {
            cy.get('#username').type('testing')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()

            cy.contains('Logged in')
        })

        it('Login fails with wrong credentials', function() {
            cy.get('#username').type('dsadasd')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()

            cy.contains('Wrong Credentials')
        })
    })

    describe('Create Blog Post', function() {
        beforeEach(function() {
            cy.get('#username').type('testing')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()
        })

        it('Logged in user can create blog post', function() {
            cy.contains('Create Blog Post').click()

            const blogPost = {
                title: 'Mew Mew Mew',
                author: 'Mc Aurthor',
                url: 'www.entertainment.com'
            }

            cy.get('#title').type(blogPost.title)
            cy.get('#author').type(blogPost.author)
            cy.get('#url').type(blogPost.url)

            cy.get('#submit-button').click()

            cy.contains('Blog Post Created')
        })
    })

    describe('Delete Blog Post', function() {

        beforeEach(function() {
            cy.get('#username').type('testing')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()

            cy.contains('Create Blog Post').click()

            const blogPost = {
                title: 'New Trendy Blog Post',
                author: 'Mr. Toad',
                url: 'www.frogworld.com'
            }

            cy.get('#title').type(blogPost.title)
            cy.get('#author').type(blogPost.author)
            cy.get('#url').type(blogPost.url)

            cy.get('#submit-button').click()

            cy.contains('Logout').click()
        })

        it('unauthorized user cannot delete blog', function() {
            cy.get('#username').type('testing2')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()

            cy.contains('delete').should('not.exist')
            cy.contains('Logout').click()
        })

        it('authorized user can delete blog', function() {
            cy.get('#username').type('testing')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()

            cy.contains('delete').click()
            cy.contains('successfully')
        })
    })

    describe('sorting test', function() {
        beforeEach(function() {

            const user = {
                username: 'testing',
                password: 'Abc@12345'
            }

            cy.request('POST', 'http://localhost:3003/api/login', user)
            .then(response => {
                localStorage.setItem('loggedOnUser', JSON.stringify(response.body))
            })

            cy.get('#username').type('testing')
            cy.get('#password').type('Abc@12345')
            cy.get('#login-button').click()

            cy.contains('Logged in')

        })

        it('post the blogs', function() {

            const blogPost1 = {
                title: 'New Trendy Blog Post',
                author: 'Mr. Toad',
                url: 'www.frogworld.com',
                likes: 4
            }
            const blogPost2 = {
                title: 'New Trendy Blog Post 2',
                author: 'Mr. Toad 2',
                url: 'www.frogworld.com',
                likes: 2
            }

            cy.request({
                url: 'http://localhost:3003/api/blogs',
                method: 'POST',
                body: blogPost1,
                headers: {
                  'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedOnUser')).token}`
                }
              })

              cy.request({
                url: 'http://localhost:3003/api/blogs',
                method: 'POST',
                body: blogPost2,
                headers: {
                  'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedOnUser')).token}`
                }
              })

              cy.request('GET', 'http://localhost:3003/api/blogs')
            .then(response => console.log(response.length))

        })

    })
})
