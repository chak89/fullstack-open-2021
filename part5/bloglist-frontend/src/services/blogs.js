import axios from 'axios'

//Backend URL
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const commands = {
	getAll
}

export default commands