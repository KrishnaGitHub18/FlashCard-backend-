const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET_TOKEN;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // If the token is valid, we save the user data for later use
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
