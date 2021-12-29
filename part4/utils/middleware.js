const logger = require('./logger')

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


module.exports = {
	errorHandler
}