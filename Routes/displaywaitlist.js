const express = require('express');
const router = express.Router();
const db = require('../database'); 
const protectRoute = require('../middleware/protectData');

router.get('/display-waitlist', protectRoute, (req, res) => {

    const query = 'SELECT * FROM waitlist';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            console.log("error fetching data", err);
            return res.status(500).json({ success: false, message: 'Error fetching data', error: err });
        }
        res.status(200).json({ success: true, data: results });
    });
});

module.exports = router;
