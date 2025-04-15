const mongoose = require('mongoose');
const Order = require('../models/orders.model');
const OrderItem = require('../models/order-item.model');
const Address = require('../models/addresses.model');
const Payment = require('../models/payments.model');
const couponService = require('./coupon.service');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errorHandler');

class OrderService {
  async createOrder(userId, orderData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Validate inputs
      if (!orderData.items || !orderData.shippingAddressId || !orderData.paymentMethod) {
        throw new AppError('Missing required fields', 400);
      }

      // Verify address
      const address = await Address.findOne({ _id: orderData.shippingAddressId, userId }).session(session);
      if (!address) {
        throw new AppError('Invalid shipping address', 404);
      }

      // Create order items
      const orderItems = [];
      let subTotal = 0;

      for (const item of orderData.items) {
        // Fetch product details (assuming Product model exists)
        const product = await mongoose.model('Product').findById(item.productId).session(session);
        if (!product || product.stock < item.quantity) {
          throw new AppError(`Product ${item.productId} is unavailable or out of stock`, 400);
        }

        const orderItem = new OrderItem({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
          subtotal: product.price * item.quantity,
        });

        await orderItem.save({ session });
        orderItems.push(orderItem._id);
        subTotal += orderItem.subtotal;

        // Update product stock
        product.stock -= item.quantity;
        await product.save({ session });
      }

      // Calculate taxes and shipping (simplified logic, customize as needed)
      const taxRate = 0.1; // 10% tax
      const taxAmount = subTotal * taxRate;
      const shippingCost = 10; // Fixed shipping cost

      // Apply coupon if provided
      let discountAmount = 0;
      let couponCode = null;
      if (orderData.couponCode) {
        const couponResult = await couponService.applyCoupon(orderData.couponCode, subTotal, orderItems);
        discountAmount = couponResult.discountAmount;
        couponCode = couponResult.coupon.code;
      }

      // Calculate total
      const totalAmount = subTotal + taxAmount + shippingCost - discountAmount;

      // Create payment record
      const payment = new Payment({
        userId,
        amount: totalAmount,
        method: orderData.paymentMethod,
        status: 'pending',
      });
      await payment.save({ session });

      // Create order
      const order = new Order({
        userId,
        orderItems,
        shippingAddress: address._id,
        payment: payment._id,
        totalAmount,
        subTotal,
        taxAmount,
        shippingCost,
        discountAmount,
        couponCode,
        status: 'pending',
        statusHistory: [{ status: 'pending', note: 'Order created' }],
        notes: orderData.notes,
      });

      await order.save({ session });
      payment.orderId = order._id;
      await payment.save({ session });

      await session.commitTransaction();
      logger.info(`Order created successfully: ${order._id}`);
      return order.populate('orderItems shippingAddress payment');
    } catch (error) {
      await session.abortTransaction();
      logger.error(`Order creation failed: ${error.message}`);
      throw error;
    } finally {
      session.endSession();
    }
  }

  async updateOrderStatus(orderId, status, note) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    order.status = status;
    order.statusHistory.push({ status, note });
    order.updatedAt = Date.now();
    await order.save();

    logger.info(`Order ${orderId} status updated to ${status}`);
    return order;
  }
}

module.exports = new OrderService();