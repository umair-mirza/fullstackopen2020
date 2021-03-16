import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPhoneObject) => {
    const request = axios.post(baseUrl, newPhoneObject)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (id, newNumberObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newNumberObject)
    return request.then(response => response.data)
}

export {getAll, create, deleteNumber, updateNumber}