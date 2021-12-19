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
	}
})


test('correct amount of blogs are returned as json', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('the unique identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})


test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
	const newBlog = {
		title: "Test blog",
		author: "Test",
		url: "https://testblog.com",
		likes: 100,
	}

	let response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})


test('if the likes property is missing from the request, it will default to the value 0', async () => {
	const newBlog = {
		title: "Blog with 0 likes",
		author: "0 likes",
		url: "www.likes.com"
	}

	let response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	response = await api.get('/api/blogs')
	expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})


test('if title and url properties missing, respond with 400 Bad Request', async () => {
	const newBlog = {
		author: "Missing title",
		url: "https://testblog.com",
		likes: 100,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)
})


test('deletion of a blog', async () => {
	const newBlog = {
		title: "Blog to be deleted",
		author: "Delete me",
		url: "https://deleteme.com",
		likes: 666,
	}

	let response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	await api
		.delete(`/api/blogs/${response.body.id}`)
		.expect(200)
	
	await api
		.get(`/api/blogs/${response.body.id}`)
		.expect(400)
		.expect('Content-Type', /application\/json/)
})


test('updating a blog is working', async () => {
	const newBlog = {
		title: "Blog to be updated",
		author: "UpdateMe",
		url: "https://Updateme.com",
		likes: 88888,
	}

	let response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const updatedBlog = {
		likes: 98
	}

	await api
	.put(`/api/blogs/${response.body.id}`)
	.send(updatedBlog)
	.expect(200)

	
	response = await api
		.get(`/api/blogs/${response.body.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body.likes).toBe(98)

})


//afterAll function of Jest to close the connection to the database after the tests are finished executing.
afterAll(() => {
	mongoose.connection.close()
})