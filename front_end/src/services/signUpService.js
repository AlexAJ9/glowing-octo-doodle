import axios from 'axios'
const baseUrl = '/api/register'

const register = async (credentials) => {
    const config = { headers: { 'Content-Type': 'application/json ' } }
    const res = await axios.post(baseUrl, credentials, config)
    return res.data
}
export default { register }