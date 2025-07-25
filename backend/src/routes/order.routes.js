const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateOrderCreation } = require('../middlewares/validate.request');

orderRoutes.post('/', orderController.createOrder);
orderRoutes.get('/', orderController.listOrders);
orderRoutes.get('/:id', orderController.getOrder);
orderRoutes.patch('/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = {orderRoutes};