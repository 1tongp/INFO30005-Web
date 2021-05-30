const express = require('express');
const CustomerRouter = express.Router();

var customerController = require('../controllers/customerController');

// POST request to register as a customer
CustomerRouter.post('/register',customerController.customerRegisterPost);

// GET request to get customer details
CustomerRouter.get('/:id', customerController.customerDetailGet);

// POST request to change the customer details
CustomerRouter.post('/changeDetails/:id', customerController.customerChangeDetailsPost);

// POST request to login as customer
CustomerRouter.post('/login', customerController.customerLoginPost);

// POST request for front end to go back to the home page
CustomerRouter.post('/loginhash', customerController.customerLoginUnhashPost);
module.exports = CustomerRouter;