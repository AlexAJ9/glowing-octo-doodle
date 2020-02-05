const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, minlength: 3, unique: true, match: [/^[a-z0-9_-]{3,15}$/, 'is invalid']
    },
    passwordHash: { type: String, required: true },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }, { rating: Number }],
    items: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Item'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)
module.exports = User