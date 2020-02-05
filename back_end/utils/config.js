require('dotenv').config()

const PORT = process.env.PORT
const url = process.env.DB_URI

module.exports = {
    PORT,
    url
}