const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET_TOKEN;

router.post('/login', (req, res) => {

    try {
        let username = req.body.username;
        let password = req.body.password;

        if ( username === process.env.CORRECT_USERNAME && password === process.env.CORRECT_PASSWORD ) {
            data = {
                username: username
            }

            const authToken = jwt.sign(data, jwtSecret, { expiresIn: '3h' });
            res.status(200).json(
                {
                    success: true,
                    authToken: authToken
                }
            );
        }
        else {
            res.status(401).json({success: false})
        }

    }
    catch (error) {
        console.log("Error in registering the new user", error);
        res.status(400).json({ success: false });
    }
}
)

module.exports = router;