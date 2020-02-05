const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const itemSchema = new mongoose.Schema({
    item_name: { type: String, required: true, minlength: 3 },
    item_description: { type: String, required: true, minlength: 5 },
    date: Date,
    item_rating: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item