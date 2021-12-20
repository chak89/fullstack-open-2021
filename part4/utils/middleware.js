const logger = require('./logger')

//Middleware errorhandling
const errorHandler = (error, request, response, next) => {
	logger.error('Middleware errorhandling:', error.name)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}


	next(error)
}


module.exports = {
	errorHandler
}