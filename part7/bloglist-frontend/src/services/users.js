import axios from 'axios'

//Backend URL
const baseUrl = 'http://localhost:3003/api/users'

const getAllUsers = async () => {
	console.log('users.js -> getAllUsers()')
	const response = await axios.get(baseUrl)
	return response.data
}

export default { getAllUsers }