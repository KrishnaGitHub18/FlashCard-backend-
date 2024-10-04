const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../database');

const jwtSecret = process.env.JWT_SECRET_TOKEN;

router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;
        const [rows] = await db.promise().execute('SELECT * FROM Userid WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid username or password1" });
        }

        const data = { username: user.username }; 
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '3h' });

        res.status(200).json({
            success: true,
            authToken: authToken
        });

    } catch (error) {
        console.log("Error during login process", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
