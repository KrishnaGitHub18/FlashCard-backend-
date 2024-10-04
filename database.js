const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createConnection({
    host: process.env.SQL_DB_HOST,
    user: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASENAME,
    connectionLimit: 100,
})  ;

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});


module.exports = pool;
