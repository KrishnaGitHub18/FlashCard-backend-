const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/signup-req', async (req, res) => {
    const { username, passwor, email } = req.body;

    if (!username || !passwor || !email) {
        return res.status(400).send('All the details are required');
    }

    // console.log("username :", username);
    // console.log("passwor :", passwor);
    // console.log("email :", email);
    // return;

    const [rows] = await db.promise().execute('SELECT * FROM Userid WHERE username = ?', [username]);
    if (rows.length) {
        return res.status(401).json({ success: false, message: "Username not available" });
    }

    let curr_data = [];
    try {
        const [rows, fields] = await db.promise().execute('SELECT * FROM waitlist');
        curr_data = rows ;
    } catch (error) {
        console.log('error in fetching the data in order to assign index value in waitlist route.', error);
    }
    const size_data = curr_data.length;
    let id = size_data;

    const password = passwor;
    const query = 'INSERT INTO waitlist (username, password, id, email) VALUES (?, ?, ?, ?)';
    db.query(query, [username, password, id, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data:');
        }
        console.log('Data inserted successfully:', result);
        res.status(201).send('Data inserted successfully');
    });
});

module.exports = router;
