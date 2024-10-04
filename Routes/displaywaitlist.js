const express = require('express');
const router = express.Router();
const db = require('../database'); 
const protectRoute = require('../middleware/protectData')

router.get('/display-waitlist', protectRoute, (req, res) => {

    const query = 'SELECT * FROM waitlist';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data', err);
        }
        res.status(200).json(results); 
    });

});

module.exports = router;
