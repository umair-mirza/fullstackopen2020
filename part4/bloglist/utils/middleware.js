const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    if(process.env.NODE_ENV !== 'test') {
        console.log('Method:', request.method)
        console.log('Path:', request.path)
        console.log('Request Body:', request.body)
        console.log('----')
    }
    next()
}

//For unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

//For getting Token
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request['token'] = authorization.substring(7)
    }
    next()
}

//For Extracting User
const userExtractor = (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request.user =  decodedToken.id
        next()
    } catch(error) {
        console.log(error)
        if(error.name === 'JsonWebTokenError') {
            return response.status(401).json({error: "Invalid Token"})
        }
        return response.status(400).json({error: error.message})
    }
    
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}