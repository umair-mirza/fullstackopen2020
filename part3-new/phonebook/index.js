require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('data', function (req, res) { 
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return null
    }
 })

app.use(morgan(':method :url :response-time :data'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// app.get('/info', (request, response) => {
//     const datetime = new Date()
//     response.send(`<div>Phonebook has info for ${persons.length} people</div>
//                     <div>${datetime}</div>`)
// })

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if(!person) {
            response.status(404).end()
        } else {
            response.json(person)
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.deleteOne({_id: id}).then(result => {
        console.log(result)
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', async (request, response, next) => {

    const found = await Person.countDocuments({name: request.body.name, number: request.body.number})

    console.log(found)

    if(!request.body.name || !request.body.number) {
        return response.status(400).json({
            error: 'Content is missing'
        })
    }
    
    if(found === 1) {
        return response.status(400).json({
            error: 'Contact already exists'
        })
    }

    const newPerson = new Person ({
        name: request.body.name,
        number: request.body.number,
        // id: personId
    })

    newPerson.save()
    .then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    const person = {
        name: request.body.name,
        number: request.body.number
    }

    Person.findByIdAndUpdate(id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})

    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})

