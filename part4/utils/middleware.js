const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//Middleware errorhandling
const errorHandler = (error, request, response, next) => {
	logger.error('Middleware errorhandling:', error)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	else if (error.message === 'passwordLengthError') {
		return response.status(404).json({ error: "Password must be at least 3 characters long" })
	}
	else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		})
	}


	next(error)
}

//Helper function to set the request.token to authorization header
const tokenExtractor = (request, response, next) => {
	logger.info('Running tokenExtractor')
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	} else {
		request.token = null
	}
	logger.info('request.token:', request.token )
	next()
}

//Helper function to find out the user and sets it to the request object
const userExtractor = async (request, response, next) => {
	logger.info('Running userExtractor')
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	request.user = await User.findById(decodedToken.id)
	logger.info('request.user:', request.user )
	next()
}

module.exports = {
	errorHandler,
	tokenExtractor,
	userExtractor
}