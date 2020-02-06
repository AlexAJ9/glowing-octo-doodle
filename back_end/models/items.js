const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const itemSchema = new mongoose.Schema({
    item_name: { type: String, required: true, minlength: 3 },
    item_description: { type: String, required: true, minlength: 5 },
    date: { type: Date, default: Date.now },
    item_rating: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratings: [{ type: Number }],
    image: { type: String },
    cloudImage: { type: String }
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

itemSchema.plugin(uniqueValidator)
const Item = mongoose.model('Item', itemSchema)
module.exports = Item