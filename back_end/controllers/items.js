const jwt = require('jsonwebtoken')
const Item = require('../models/items')
const User = require('../models/users')
const itemsRouter = require('express').Router()

itemsRouter.get('/', async (req, res, next) => {
    try {
        const data = await Item.find({}).populate('user', { username: 1 })
        res.json(data.map(x => x.toJSON()))
    }
    catch (err) {
        next(err)
    }
})

itemsRouter.get('/:id', async (req, res, next) => {
    try {
        const data = await Item.findById(req.params.id)

        if (data) { res.json(data.toJSON()) }
        else { res.status(404).end() }
    }
    catch (err) {
        next(err)
    }
})

itemsRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        const token = req.token
        const decodedToken = jwt.verify(token, process.env.Secret)

        if (!decodedToken || !token) {
            return res.status(401).json({ error: 'invalid token' })
        }

        const user = await User.findById(decodedToken._id)

        const newItem = new Item({
            item_name: body.item_name,
            item_description: body.item_description,
            date: body.date,
            item_rating: body.item_rating,
            times_rated: body.times_rated,
            user: user._id
        })

        const item = await newItem.save()
        console.log(newItem)
        user.items = user.items.concat(item._id)
        await user.save()
        res.json(item.toJSON())
    }
    catch (err) {
        next(err)
    }
})

itemsRouter.put('/:id', async (req, res, next) => {
    try {
        const body = req.body
        const updatedItem = {
            item_name: body.item_name,
            item_description: body.item_description,
            date: body.date,
            item_rating: body.item_rating
        }
        const item = await Item.findByIdAndUpdate(req.params.id, updatedItem, { new: true })
        res.status(201).json(item.toJSON())
    }
    catch (err) {
        next(err)
    }
})
itemsRouter.put('/rate/:id', async (req, res, next) => {
    try {
        const token = req.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken || !token) {
            return res.status(401).json({ error: 'invalid token' })
        }
        const user = await User.findById(decodedToken._id)
        const itemToUpdate = await Item.findById(req.params.id)
        let rating = 0
        if (itemToUpdate.times_rated > 1) {
            rating = (Number(req.body.item_rating) + Number(itemToUpdate.item_rating)) / 2
        }
        else rating = (Number(req.body.item_rating) + Number(itemToUpdate.item_rating)) / (itemToUpdate.times_rated + 1)

        const updatedItem = {
            item_name: itemToUpdate.item_name,
            item_description: itemToUpdate.item_description,
            item_rating: rating,
            date: itemToUpdate.date,
            times_rated: itemToUpdate.times_rated + 1,
        }
        const item = await Item.findByIdAndUpdate(req.params.id, updatedItem, { new: true })
        user.ratings = user.ratings.concat({ id: req.params.id, rating: req.body.item_rating })
        await user.save()
        res.status(201).json(item.toJSON())
    }
    catch (err) {
        next(err)
    }
})

itemsRouter.delete('/:id', async (req, res, next) => {
    try {
        const token = req.token
        if (!token) {
            return res.status(401).json({ error: 'missing token' })
        }
        const decodedToken = jwt.verify(token, process.env.Secret)
        if (!decodedToken._id) {
            return res.status(401).json({ error: 'invalid token' })
        }
        const userId = decodedToken._id

        const item = await Item.findByIdAndRemove(req.params.id)
        const user = await User.findById(userId)

        if (!(userId.toString() === item.user.toString())) {
            return res.status(404).end()
        }
        user.items = user.items.filter(x => x._id !== req.params.id)
        await user.save()
        res.status(204).end()
    }
    catch (err) {
        next(err)
    }
})

module.exports = itemsRouter