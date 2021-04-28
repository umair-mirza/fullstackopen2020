const express = require('express')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')

const userRouter = express.Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, url: 1, author: 1})
    try {
        if(users.length > 0) {
            response.json(users)
        } else {
            response.status(404).json({error: 'Users not found in the Database'})
        }
    } catch(error) {
        response.status(500).json({error: error.message})
    }
})

userRouter.post('/', async (request, response) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const createdBlogs = await Blog.findOne({})

    try {
        const newUser = new User({
            username: request.body.username,
            name: request.body.name,
            password: passwordHash,
            blogs: createdBlogs
        })

        const savedUser = await newUser.save()

        response.json(savedUser)
        
    } catch(error) {
        response.status(400).json({error: error.message})
    }
})

module.exports = userRouter