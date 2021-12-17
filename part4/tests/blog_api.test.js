const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


//Initialise the database before test.
//Delete the database and then repopulate.
beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
		console.log('saved')
	}

	console.log('done')
})


test('correct amount of blogs are returned as json', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})





//afterAll function of Jest to close the connection to the database after the tests are finished executing.
afterAll(() => {
	mongoose.connection.close()
})