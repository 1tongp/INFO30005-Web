const express = require('express');
const CustomerRouter = express.Router();

var customerController = require('../controllers/customerController');

// POST request to register as a customer
CustomerRouter.post('/register',customerController.customerRegisterPost);

// GET request to get customer details
CustomerRouter.get('/:id', customerController.customerDetailGet);

// POST request to change the customer details
CustomerRouter.post('/changeDetails/:id', customerController.customerChangeDetailsPost);

CustomerRouter.post('/login', customerController.customerLoginPost);
module.exports = CustomerRouter;