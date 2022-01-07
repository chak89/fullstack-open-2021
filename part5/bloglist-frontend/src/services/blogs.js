import axios from 'axios'

//Backend URL
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (newBLog) => {
	const config = {
		headers: { Authorization: token }
	};

	console.log('newBLog', newBLog)
	const response = await axios.post(baseUrl, newBLog, config)
	return response.data
}


const commands = {
	getAll,
	create,
	setToken
}

export default commands