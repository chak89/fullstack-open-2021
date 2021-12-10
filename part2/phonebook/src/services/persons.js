import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObjet) => {
    const request = axios.post(baseUrl, personObjet)
    return request.then(response => response.data)
}

const deleteId = (personId) => {
    const request = axios.delete(baseUrl+`/${personId}`)
    return request.then((response) => console.log(response));
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const persons = {
    getAll,
    create,
    deleteId,
    update
}

export default persons