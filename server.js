// open new Terminal
// "npm install" to download the node_modules
// "npm run server" to run the server and connect to database

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const server = express();

// lead routes in
const customer = require('./routes/customer');
const vendor = require('./routes/vendor');
const snack = require('./routes/snack');
const order = require('./routes/order');

server.get('/', (req, res) => {
    res.status(200).send("Welcome to Keepitsimple Web App!")
})

server.use(cors());

// Bodyparser Middleware
server.use(bodyParser.json());

// connect mongoose new method
const database = require('./config/keys').mangoURL;
mongoose
    .connect(database, 
        {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Successfully Connected to MongoDB!! Start run the request!"))
    
    

// use the routes
server.use('/customer',customer);
server.use('/vendor', vendor);
server.use('/snack', snack);
server.use('/order', order);

server.listen(process.env.PORT || 8080,() => {
    console.log(`Server now listening at http://localhost:8080`)
})



