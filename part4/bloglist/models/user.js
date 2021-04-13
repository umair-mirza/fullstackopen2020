const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password //the password hash should not be revealed
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User