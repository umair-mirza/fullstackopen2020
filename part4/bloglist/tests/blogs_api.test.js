const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// beforeEach((async () => {
//     await Blog.deleteMany({})
//     await Blog.insertMany(helper.initialBlogs)
// }))

describe('blogs api tests', () => {
    test('there are three blogs', async () => {
        const result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(3)
    })

    test('content type is JSON', async () => {
        await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
    })

    test('unique identifier of blogs is named id', async () => {

        const result = await api.get('/api/blogs')
        expect(result.body[0].id).toBeDefined()
    })

    test('creates a new blog post', async () => {

        const initialBlogs = await api.get('/api/blogs')

        const newPost = {
            title: 'new sample blog post',
            author: 'John Doeeeey',
            url: 'https://github.com/umair-mirza/fullstack-part4b/blob/main/app.js#L10',
            likes: 2
        }

        await api.post('/api/blogs').send(newPost).expect(201)

        const finalBlogs = await api.get('/api/blogs')
        expect(finalBlogs.body.length).toBe(initialBlogs.body.length+1)
    })
    test('verify if likes defaults to zero', async () => {
        const newPost = {
            title: 'Latest post on 4th April',
            author: 'Newbie Newbie',
            url: 'https://github.com/umair-mirza/fullstack-part4b/blob/main/app.js#L10'
        }

        await api.post('/api/blogs').send(newPost)

        const posts = await api.get('/api/blogs')
        const lastPost = posts.body[posts.body.length-1]

        expect(lastPost.likes).toEqual(0)        
    })

    test('verify missing title and url return 400', async () => {

        const initialBlogs = await api.get('/api/blogs')

        const newPost = {
            author: 'Newbie Dewbie',
            likes: 8
        }
        await api.post('/api/blogs').send(newPost).expect(400)

        const finalBlogs = await api.get('/api/blogs')
        expect(finalBlogs.body.length).toEqual(initialBlogs.body.length)
    })
})

describe('deletion of blog posts', () => {
    test.only('successfully delete a blog post', async () => {
        const id = '606ad8c3cacae708645467fe'
        await api.delete(`/api/blogs/${id}`).expect(204)
    })
})



afterAll(() => {
    mongoose.connection.close()
})