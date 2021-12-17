const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

	const reqBody = request.body

	const newBlog = 
	{
		title: reqBody.title,
		author: reqBody.author,
		url: reqBody.url,
		likes: reqBody?.likes || 0
	}

	const blog = new Blog(newBlog)
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

module.exports = blogsRouter