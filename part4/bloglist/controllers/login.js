const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const express = require('express')
const User = require('../models/user')

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {

    const user = await User.findOne({username: request.body.username})

    const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(request.body.password, user.password)

    if(!(user && passwordCorrect)) {
        return response.status(401).json({error: 'Username or Password is invalid'})
    }

    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    response.status(200).send({token, username: user.username, name: user.name})

})

module.exports = loginRouter