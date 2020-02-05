const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users')

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        if (!body.password || body.password < 4) {
            return res.status(400).json({ error: 'Password must be at least 4 characters.' })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const userToAdd = new User({
            username: body.username,
            passwordHash: passwordHash
        })
        const newUser = await userToAdd.save()
        res.status(200).json(newUser)
    }
    catch (err) {
        next(err)
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('items', { item_name: 1, item_rating: 1 })
        res.json(users.map(x => x.toJSON()))
    }
    catch (err) { next(err) }
})

module.exports = userRouter