const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')

//Get all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

//Post a blog
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

//Delete a blog by id
blogsRouter.delete('/:id', async (request, response) => {
	const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
	response.json(deletedBlog)
})

//Get a blog by id
blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)

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
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true})
	response.json(updatedBlog);
})

module.exports = blogsRouter