const express = require('express');
const router = express.Router();
const db = require('../database'); 


router.get('/displaydata', (req, res) => {

    const query = 'SELECT * FROM card';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data', err);
        }

        res.status(200).json(results); 
    });

});

module.exports = router;
