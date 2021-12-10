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

const persons = {
    getAll,
    create,
    deleteId
}

export default persons