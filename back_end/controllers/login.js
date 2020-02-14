const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const body = req.body
    const user = await User.findOne({ username: body.username })

    const passCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    if (!(user && passCorrect)) {
        return res.status(401).json({ error: 'Invalid Credentials' })
    }
    const userToken = {
        _id: user._id,
        username: user.username
    }
    const token = jwt.sign(userToken, process.env.Secret)
    res.status(200).send({ username: user.username, id: user.id, token })
})

module.exports = loginRouter