const express = require('express');
const router = express.Router();
const db = require('../database'); 
const protectRoute = require('../middleware/protectData')

router.delete('/delete-data/:cardId', protectRoute, (req, res) => {

    const { cardId } = req.params;

    if (!cardId) {
        return res.status(400).send('Card ID is required');
    }

    const query = 'DELETE FROM card WHERE cardid = ?';

    db.query(query, [cardId], (err, result) => {
    
        if (err) {
            console.error('Error deleting data:');
            return res.status(500).send('Error deleting card');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Card not found');
        }

        console.log('Card deleted:', result);
        res.status(200).send('Card deleted successfully');
    
    });

});

module.exports = router;
