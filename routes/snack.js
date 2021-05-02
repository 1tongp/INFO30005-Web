const express = require('express');
const snackRouter = express.Router();

var snackController = require('../controllers/snackController');

// POST request for vendor to create a snack into database
snackRouter.post('/create',snackController.snackCreatePost);

// GET request for customer to get the snacks menu
snackRouter.get('/', snackController.snackMenuGet);

// GET request for customer to get a particular snack's details
snackRouter.get('/:id', snackController.snackDetailGet);

module.exports = snackRouter;