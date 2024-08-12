const express = require('express');
const cors = require('cors');
// const mySQL_data = require('./database'); 

const app = express();
const port = 5000;

app.use(express.json());

// CORS
app.use(cors());

// connect to mySQL
// mySQL_data();


//creating the routes
app.use('/api', require('./Routes/addData'));
app.use('/api', require('./Routes/editData'));
app.use('/api', require('./Routes/deleteData'));
app.use('/api', require('./Routes/displaydata'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    // console.log(card_data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
