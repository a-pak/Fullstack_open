import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, person) => {
    const req = axios.put(`${baseUrl}/${id}`, person)
    return req.then(res => res.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }