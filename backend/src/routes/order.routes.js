const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.service');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateOrderCreation } = require('../middlewares/validate.request');

router.post('/', authMiddleware, validateOrderCreation, orderController.createOrder);
router.get('/:id', authMiddleware, orderController.getOrder);
router.patch('/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;