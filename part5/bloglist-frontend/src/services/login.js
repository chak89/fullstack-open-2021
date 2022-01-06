import axios from 'axios'

//Backend URL
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
	try {
		const response = await axios.post(baseUrl, credentials)
		return response.data
	} catch (error) {
		console.log('Error:', error.response.data);
		return null
	}
}

export default { login }