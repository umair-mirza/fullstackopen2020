const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

const blogRouter = express.Router()


blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        if(blogs) {
            response.json(blogs)
        } else {
            response.status(400).end()
        }
    } catch(error) {
        response.status(500).end()
    }
  })

blogRouter.get('/:id', async (request, response) => {
    const blogId = request.params.id
    try {
        const blog = await Blog.find({_id: blogId})
        response.json(blog)
    } catch(error) {
        console.log(error)
        if(error.name === 'CastError') {
            return response.status(400).json({error: 'malformed id'})
        }
        response.status(400).json({error: error.message})
    }
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    try {
        const user = request.user

        if(!request.token || !user) {
            return response.status(401).json({error: 'Token is missing or invalid'})
        }

        const creator = await User.findById(user)

        const newBlog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: creator
        })

        const savedBlog = await newBlog.save()

        response.status(201).json(savedBlog)
    } catch(error) {
        console.log(error)
        if(error.name === 'JsonWebTokenError') {
            return response.status(401).json({error: "Invalid Token"})
        }
        return response.status(400).json({error: error.message})
    }

  })

  blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

      try {
        const user = request.user

        const blogId = await Blog.findById(request.params.id)

        if(!blogId) {
            return response.status(404).json({error: 'Blog ID not found'})
        }

        if(blogId.user.toString() === user.toString()) {
        await Blog.findByIdAndRemove(blogId)
        response.status(204).end()
        } else {
            response.status(401).json({error: 'Only Blog Creator can delete the Blog Post'})
        }
      } catch(error) {
          response.status(400).json({error: error.message})
      }

  })

  blogRouter.put('/:id', async (request, response) => {
      try {
        const blogId = await Blog.findById(request.params.id)
        if(blogId) {
            const newBlog = {
                likes: request.body.likes
            }

            const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
            response.status(200).json(result)
        } else {
            response.status(404).end()
        }
      } catch(error) {
        response.status(400).json({error: error.message})
      }
  })

  module.exports = blogRouter