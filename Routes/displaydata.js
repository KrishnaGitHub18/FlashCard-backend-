const express = require('express');
const router = express.Router();
const db = require('../database'); 

router.get('/displaydata', async (req, res) => {
    try {

        const query = 'SELECT * FROM card';
        const [results] = await db.promise().query(query); 
        res.status(200).json({ success: true, data: results });

    } catch (error) {

        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Error fetching data', error });
    
    }
});

module.exports = router;
