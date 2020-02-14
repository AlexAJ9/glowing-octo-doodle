const cors = require('cors')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const itemsRouter = require('./controllers/items')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to DB!')
    })
    .catch(err => {
        console.log('error connecting to DB', err.message)
    })
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/items', itemsRouter)
app.use('/api/users', usersRouter)
app.use('/api/register', usersRouter)
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app