import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createBlog = async (postData) => {

        const config = {
            headers: {Authorization: token}
        }

        const response = await axios.post(baseUrl, postData, config)
        return response.data   
}

const deleteBlog = async (blogId) => {
    const config = {
        headers: {Authorization: token}
    }

    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

export {getAll, createBlog, deleteBlog, setToken}