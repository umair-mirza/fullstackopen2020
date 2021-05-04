import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnec = async (content) => {
    const newObject = {
        content: content,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
    }
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const updateAnec = async (objectToUpdate) => {
    const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate)
    return response.data
}

export {getAll, createAnec, updateAnec}