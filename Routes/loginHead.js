const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET_TOKEN;

router.post('/loginHead', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('Username123:', username);
        console.log('Password123:', password);
        
        // if (username !== process.env.CORRECT_USERNAME || password !== CORRECT_PASSWORD){
        if (username !== "admin123" || password !== "admin123"){
            console.log('incorrect credentials');
            return ;
        }

        const data = { username: username }; 
        const headToken = jwt.sign(data, jwtSecret, { expiresIn: '3h' });

        res.status(200).json({
            success: true,
            headToken: headToken
        });

    } catch (error) {
        console.log("Error during login process", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
