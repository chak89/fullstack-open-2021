const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//Get all users
usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

//POST request, create a new user. Hash password using BCRYPT
usersRouter.post('/', async (request, response) => {
	const reqBody = request.body

	if (reqBody.password.length < 3) {
		return response.status(404).json({ error: "Password must be at least 3 characters long" })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(reqBody.password, saltRounds)

	const newUser =
	{
		username: reqBody.username,
		name: reqBody.name,
		passwordHash: passwordHash
	}

	const user = new User(newUser)
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = usersRouter