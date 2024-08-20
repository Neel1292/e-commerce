const Pool = require('pg').Pool;
require('dotenv').config();

// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL,
// })

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host : process.env.HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {},
});

module.exports = pool;