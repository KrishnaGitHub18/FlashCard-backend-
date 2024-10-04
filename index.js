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
app.use('/api', require('./Routes/login'));
app.use('/api', require('./Routes/loginHead'));
app.use('/api', require('./Routes/signup'));
app.use('/api', require('./Routes/waitlist'));
app.use('/api', require('./Routes/displaywaitlist'));
app.use('/api', require('./Routes/deleteFromWaitlist'));
app.use('/api', require('./controller/emailController'));

//middleware
app.use('/api', require('./middleware/protectData'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
