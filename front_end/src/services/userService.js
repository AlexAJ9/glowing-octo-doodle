import axios from 'axios'

const baseUrl = '/api/users'

const getUserInfo = async (data) => {
    const res = await axios.get(`${baseUrl}/${data}`)
    return res.data
}

export default { getUserInfo }