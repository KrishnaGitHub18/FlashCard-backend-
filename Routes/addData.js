const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/add-data', async (req, res) => {
    const { cardque, cardans } = req.body;

    if (!cardque || !cardans) {
        return res.status(400).send('Question and answer are required');
    }




    // fetching the data
    let curr_data = [];
    try {
        const [rows, fields] = await db.promise().execute('SELECT * FROM card');
        curr_data = rows ;

    } catch (error) {
        console.log('error printing code', error);
    }
    const size_data = curr_data.length;

    let cardid = size_data;






    const query = 'INSERT INTO card (cardid, cardque, cardans) VALUES (?, ?, ?)';
    db.query(query, [cardid, cardque, cardans], (err, result) => {
        if (err) {
            console.error('Error inserting data:');
            return res.status(500).send('Error adding card');
        }

        console.log('Data inserted:', result);
        res.status(201).send('Card added successfully');
    });
});

module.exports = router;
