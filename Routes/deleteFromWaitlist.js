const express = require('express');
const router = express.Router();
const db = require('../database'); 


router.delete('/deleteFromWaitlist/:id', (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Card ID is required');
    }

    const query = 'DELETE FROM waitlist WHERE id = ?';

    db.query(query, [id], (err, result) => {
    
        if (err) {
            console.error('Error deleting data:');
            return res.status(500).send('Error deleting card');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Card not found');
        }

        console.log('Card deleted: ', result);
        res.status(200).send('Card deleted successfully');
    
    });

});

module.exports = router;
