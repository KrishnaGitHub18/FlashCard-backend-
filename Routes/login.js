const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "dc3d2#829ece#e64f05c2e6f3f#16da39$8daa9$9mft#vdfe28a313f3788f7ad";
require('dotenv').config();

router.post('/login', (req, res) => {

    try {
        let username = req.body.username;
        let password = req.body.password;

        console.log("username:",username,process.env.CORRECT_USERNAME);
        console.log("password:",password,process.env.CORRECT_PASSWORD);

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