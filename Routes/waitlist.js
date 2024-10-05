const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/signup-req', async (req, res) => {
    const { username, passwor, email } = req.body;

    // Checking if all required fields are provided
    if (!username || !passwor || !email) {
        return res.status(400).json({ success: false, message: 'All the details are required' });
    }

    try {
        // Checking if username already exists
        const [rows] = await db.promise().execute('SELECT * FROM Userid WHERE username = ?', [username]);
        if (rows.length) {
            return res.status(401).json({ success: false, message: "Username not available" });
        }

        // Fetching current data to assign an id
        const [curr_data] = await db.promise().execute('SELECT * FROM waitlist');
        const id = curr_data.length;

        // Inserting data into waitlist table
        const query = 'INSERT INTO waitlist (username, password, id, email) VALUES (?, ?, ?, ?)';
        db.query(query, [username, passwor, id, email], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ success: false, message: 'Error inserting data' });
            }

            console.log('Data inserted successfully:', result);
            res.status(201).json({ success: true, message: 'Data inserted successfully' });
        });

    } catch (error) {
        console.error('Error in signup request:', error);
        res.status(500).json({ success: false, message: 'Server error occurred' });
    }
});

module.exports = router;
