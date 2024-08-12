const express = require('express');
const router = express.Router();
const db = require('../database');

router.put('/edit-data/:cardid', async (req, res) => {

    const { cardid } = req.params;
    const { cardque, cardans } = req.body;

    if (!cardque || !cardans) {
        return res.status(400).send('Please fill the require sections.');
    }





    try {  

        const [rows] = await db.promise().execute('SELECT * FROM card WHERE cardid = ?', [cardid]);
        if (rows.length === 0) {
            return res.status(404).send('Card not found');
        }


        const query = 'UPDATE card SET cardque = ?, cardans = ? WHERE cardid = ?';
        const [result] = await db.promise().execute(query, [cardque, cardans, cardid]);


        if (result.affectedRows === 0) {
            return res.status(500).send('Failed to update the card');
        }

        console.log('Card updated:');
        res.status(200).send('Card updated successfully');
        
    } 
    catch (error) {

        console.error('Error updating card:', error);
        res.status(500).send('Error updating card');

    }
});

module.exports = router;
