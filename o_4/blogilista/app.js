const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)
info('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/', blogRouter)


module.exports = app