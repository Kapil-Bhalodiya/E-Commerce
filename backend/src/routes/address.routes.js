const express = require('express');
const addressRoutes = express.Router();
const addressController = require('../controllers/addresses.controller');
const jwtVerify = require('../middlewares/auth.middleware');

// Create a new address
addressRoutes.post('/', addressController.createAddress);

// Get all addresses for the user
addressRoutes.get('/', jwtVerify, addressController.getAddresses);

// Update an address
addressRoutes.put('/:addressId', addressController.updateAddress);

// Delete (soft delete) an address
addressRoutes.delete('/:addressId', addressController.deleteAddress);

module.exports = {addressRoutes};
