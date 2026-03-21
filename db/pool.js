const { Pool } = require('pg');
require('dotenv').config();

const data_host = process.env.DATA_HOST;
const data_user = process.env.DATA_USER;
const data_database = process.env.DATA_DATABASE;
const data_pwd = process.env.DATA_PWD;
const data_port = process.env.DATA_PORT;


module.exports = new Pool({
    host: `${data_host}`,
    user: `${data_user}`,
    database: `${data_database}`,
    password: `${data_pwd}`,
    port: `${data_port}`,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: true,
});