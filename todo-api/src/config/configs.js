const path = require('path')
require('dotenv').config({ path: path.resolve('.env') })
module.exports = {
    env: process.env.NODE_ENV,
    secret: process.env.JWT_SECRET
}
