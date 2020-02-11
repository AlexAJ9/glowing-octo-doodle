import axios from 'axios'
const baseUrl = '/api/items'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}
const destroyToken = () => {
    token = null
  }
const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async (data) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
    }
    const res = await axios.post(baseUrl, data, config)
    return res.data
}

const update = async (data) => {
    const res = await axios.put(`${baseUrl}/${data.id}`, data)
    return res.data
}

const remove = async (data) => {
    const res = await axios.delete(`${baseUrl}/${data.id}`)
}

export default { getAll, create, update, remove, setToken ,destroyToken}