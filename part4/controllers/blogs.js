const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

//Get all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

//Post a blog
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const reqBody = request.body

	const newBlog =
	{
		title: reqBody.title,
		author: reqBody.author,
		url: reqBody.url,
		likes: reqBody?.likes || 0,
		user: request.user.id
	}

	const blog = new Blog(newBlog)
	const savedBlog = await blog.save()
	request.user.blogs = request.user.blogs.concat(savedBlog.id)
	logger.info('blogsRouter.post -> request.user:',request.user)
	await request.user.save()
	response.status(201).json(savedBlog)
})

//Delete a blog by id
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

	const blog = await Blog.findById(request.params.id)

	if (blog === null) {
		response.status(400).json(
			{
				error: 'ID doesnt exist'
			}
		)
	}

	if (request.user.id === blog.user.toString()) {
		const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
		request.user.blogs = request.user.blogs.filter(val => (val != request.params.id))
		await request.user.save()
		response.json(deletedBlog)

	} else {
		response.status(400).json(
			{
				error: 'Unable to delete blog, creator and deleter ID doesnt match'
			}
		)
	}
})

//Get a blog by id
blogsRouter.get('/:id', async (request, response) => {
	logger.info('request:', request)
	const blog = await Blog
		.findById(request.params.id)
		.populate('user', { username: 1, name: 1 })

	if (blog === null) {
		response.status(400).json(
			{
				error: 'ID doesnt exist'
			}
		)
	} else {
		response.json(blog)
	}
})

//Update a blog by id
blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
	response.json(updatedBlog);
})

module.exports = blogsRouter