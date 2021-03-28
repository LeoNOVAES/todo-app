const path = require('path')
require('dotenv').config({ 
    path: process.env.NODE_ENV === 'test' ? path.resolve('.env.test') : path.resolve('.env') 
});
module.exports = {
    env: process.env.NODE_ENV,
    secret: process.env.JWT_SECRET,
    databaseUrl: process.env.DB_URL

}
    