const express = require('express');
const addressRoutes = express.Router();
<<<<<<< HEAD
const addressController = require('../controllers/addresses.contoller');
// const { protect } = require('../middlewares/auth.middleware');
=======
const addressController = require('../controllers/addresses.controller');
const jwtVerify = require('../middlewares/auth.middleware');
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

// Create a new address
addressRoutes.post('/', addressController.createAddress);

// Get all addresses for the user
<<<<<<< HEAD
addressRoutes.get('/', addressController.getAddresses);
=======
addressRoutes.get('/', jwtVerify, addressController.getAddresses);
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

// Update an address
addressRoutes.put('/:addressId', addressController.updateAddress);

// Delete (soft delete) an address
addressRoutes.delete('/:addressId', addressController.deleteAddress);

module.exports = {addressRoutes};
