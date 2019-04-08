const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.duplicateEntry)
app.use(middleware.ValidationError)
app.use(middleware.unknownEndpoint)

module.exports = app
