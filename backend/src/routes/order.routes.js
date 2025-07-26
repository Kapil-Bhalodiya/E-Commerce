const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateOrderCreation } = require('../middlewares/validate.request');

orderRoutes.post('/', orderController.createOrder);
<<<<<<< HEAD
=======
orderRoutes.get('/', orderController.listOrders);
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
orderRoutes.get('/:id', orderController.getOrder);
orderRoutes.patch('/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = {orderRoutes};