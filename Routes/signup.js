const express = require('express');
const router = express.Router();
const db = require('../database');
var bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
    const { username, passwor, email } = req.body;

    if (!username || !passwor || !email) {
        return res.status(400).json({
            success: false,
            message: 'All the details are necessary and required'
        });
    }

    // fetching the data
    let curr_data = [];
    try {
        const [rows, fields] = await db.promise().execute('SELECT * FROM Userid');
        curr_data = rows;
    } catch (error) {
        console.log('error in fetching the data in order to assign index value in signup route.', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching data from the database'
        });
    }

    const size_data = curr_data.length;
    let id = size_data;

    // hashing the password
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(passwor, salt);

    const query = 'INSERT INTO Userid (username, password, id, email) VALUES (?, ?, ?, ?)';
    db.query(query, [username, password, id, email], (err, result) => {
        if (err) {
            console.error('Error in registering new admin', err);
            return res.status(500).json({
                success: false,
                message: 'Error registering new admin'
            });
        }

        console.log('Added new admin', result);
        res.status(201).json({
            success: true,
            message: 'Admin registered successfully'
        });
    });
});

module.exports = router;
