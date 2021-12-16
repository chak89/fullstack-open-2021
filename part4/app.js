const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()

const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
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

module.exports = app