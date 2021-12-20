const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')


beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('test', 10)
	const user = new User({
		username: 'test',
		name: 'test user',
		passwordHash: passwordHash
	})

	await user.save()
})

describe("when there initially one user in db", () => {
	test("creating a new user", async () => {
		const newUser = {
			username: "newTestUser",
			name: "New Test User",
			password: "NewTestUserPassword"
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)

		const usersInDB = await helper.usersInDb()
		expect(usersInDB).toHaveLength(2)
	})

	test("users are returned as json", async () => {
		const response = await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		expect(response.body).toHaveLength(1)

	})

	test("all users(only 1 in DB) are returned", async () => {
		const response = await api
			.get('/api/users')

		expect(response.body).toHaveLength(1)
	})

	test("creating a user with username shorter than 3 characters fails", async () => {
		const newUser = {
			username: "ai",
			name: "User with too short username",
			password: "testPassword"
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersInDB = await helper.usersInDb()
		expect(usersInDB).toHaveLength(1)
	})

	test("creating a user with password shorter than 3 characters fails", async () => {
		const newUser = {
			username: "aiai3",
			name: "User with too short password",
			password: "te"
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(404)

		const usersInDB = await helper.usersInDb()
		expect(usersInDB).toHaveLength(1)
	})
})

//afterAll function of Jest to close the connection to the database after the tests are finished executing.
afterAll(() => {
	mongoose.connection.close()
})


