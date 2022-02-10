import axios from 'axios'

//Backend URL
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	console.log('blogs.js -> getAll:')
	const response = await axios.get(baseUrl)
	return response.data

/* 	const request = axios.get(baseUrl)
	return request.then(response => response.data) */
}

const create = async (newBLog) => {
	const config = {
		headers: { Authorization: token }
	}

	console.log('blogs.js -> newBLog', newBLog)
	const response = await axios.post(baseUrl, newBLog, config)
	return response.data
}

const update = async (updateBlog, blogId) => {
	const config = {
		headers: { Authorization: token }
	}

	console.log('blogs.js -> updateBlog', updateBlog)
	const response = await axios.put(`${baseUrl}/${blogId}`, updateBlog, config)
	return response.data
}

const remove = async(blogId) => {
	const config = {
		headers: { Authorization: token }
	}

	console.log('blogs.js -> remove() -> blogId', blogId)
	const response = await axios.delete(`${baseUrl}/${blogId}`, config)
	return response.data
}

const commands = {
	getAll,
	create,
	setToken,
	update,
	remove
}

export default commands