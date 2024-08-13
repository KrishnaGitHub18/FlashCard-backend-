const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'btewxoxfppx6u1tumta6-mysql.services.clever-cloud.com',
    user: 'uvheie1gmhxjg4ix',
    password: '8kO9wADnrA2SzbFEoeDv',
    database: 'btewxoxfppx6u1tumta6',
    connectionLimit: 10,
}) ;
 
// const pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Krishna@18092003',
//     database: 'Flashcard',
// });

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});


module.exports = pool;
