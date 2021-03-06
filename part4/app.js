const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const middleware = require('./utils/middleware')

//express-async-errors to eliminate the try-catch blocks completely in async functions
//If an exception occurs in a async route, the execution is automatically passed to the error handling middleware.
require('express-async-errors')

const app = express()
const cors = require('cors')

app.use(middleware.tokenExtractor)
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing/', testingRouter)
}



// this has to be the last loaded middleware, so that next() inside other middelware will call this
app.use(middleware.errorHandler)

module.exports = app