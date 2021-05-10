const express = require('express');
const vendorRouter = express.Router();

var vendorController = require('../controllers/vendorController')

// POST request to register as a user
vendorRouter.post('/register',vendorController.vendorRegisterPost);

// GET request to get vendor details
vendorRouter.get('/:id', vendorController.vendorDetailGet);

// POST request to set the vendor's part status
vendorRouter.post('/park/:id',vendorController.vendorParkPost);

//GET request to get five nearest vendors
vendorRouter.get('/', vendorController.vendorNearestGet);

module.exports = vendorRouter;