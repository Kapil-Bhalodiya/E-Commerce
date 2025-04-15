const Order = require('../models/orders.model');
const OrderItem = require('../models/order-item.model');
const Address = require('../models/addresses.model');
const Payment = require('../models/payments.model');
const Product = require('../models/product.model');
const Coupon = require('../models/coupons.model');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/ApiError');
const mongoose = require('mongoose');

const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id; // From auth middleware
    const { items, shippingAddressId, paymentMethod, couponCode, notes } = req.body;

    // Verify address
    const address = await Address.findOne({ _id: shippingAddressId, userId }).session(session);
    if (!address) {
      throw new ApiError('Invalid shipping address', 404);
    }

    // Snapshot the shipping address (store the full address in order)
    const shippingAddressSnapshot = {
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      street2: address.street2,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
    };

    // Create order items
    const orderItems = [];
    let subTotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new ApiError(`Product ${item.productId} is unavailable or out of stock`, 400);
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

    // Calculate taxes and shipping
    const taxRate = 0.1; // 10% tax
    const taxAmount = subTotal * taxRate;
    const shippingCost = 10; // Fixed shipping cost

    // Apply coupon if provided
    let discountAmount = 0;
    let appliedCouponCode = null;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true }).session(session);
      if (!coupon) {
        throw new ApiError('Invalid or inactive coupon', 400);
      }
      if (coupon.expiryDate < new Date()) {
        throw new ApiError('Coupon has expired', 400);
      }
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new ApiError('Coupon usage limit reached', 400);
      }
      if (subTotal < coupon.minOrderAmount) {
        throw new ApiError(`Minimum order amount is ${coupon.minOrderAmount}`, 400);
      }

      // If coupon applies to certain products, check them
      if (coupon.applicableProducts.length > 0) {
        const itemProductIds = items.map((item) => item.productId.toString());
        const isApplicable = coupon.applicableProducts.some((productId) =>
          itemProductIds.includes(productId.toString())
        );
        if (!isApplicable) {
          throw new ApiError('Coupon not applicable to these products', 400);
        }
      }

      // Calculate discount based on coupon type
      if (coupon.discountType === 'fixed') {
        discountAmount = coupon.discountValue;
      } else {
        discountAmount = (coupon.discountValue / 100) * subTotal;
        if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
          discountAmount = coupon.maxDiscountAmount;
        }
      }

      coupon.usedCount += 1;
      await coupon.save({ session });
      appliedCouponCode = coupon.code;
    }

    // Calculate total
    const totalAmount = subTotal + taxAmount + shippingCost - discountAmount;

    // Create payment record
    const payment = new Payment({
      userId,
      amount: totalAmount,
      method: paymentMethod,
      status: 'pending',
    });
    await payment.save({ session });

    // Create order
    const order = new Order({
      userId,
      orderItems,
      shippingAddress: address._id,
      shippingAddressSnapshot, // Add snapshot of the address here
      payment: payment._id,
      totalAmount,
      subTotal,
      taxAmount,
      shippingCost,
      discountAmount,
      couponCode: appliedCouponCode,
      status: 'pending',
      statusHistory: [{ status: 'pending', note: 'Order created' }],
      notes,
    });

    await order.save({ session });
    payment.orderId = order._id;
    await payment.save({ session });

    await session.commitTransaction();
    logger.info(`Order created successfully: ${order._id}`);

    const populatedOrder = await Order.findById(order._id)
      .populate('orderItems shippingAddress payment')
      .exec();

    res.status(201).json({
      success: true,
      data: populatedOrder,
      message: 'Order created successfully',
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error(`Order creation failed: ${error.message}`);
    next(error);
  } finally {
    session.endSession();
  }
};


const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id })
      .populate('orderItems shippingAddress payment')
      .exec();
    if (!order) {
      throw new ApiError('Order not found', 404);
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error(`Get order failed: ${error.message}`);
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      throw new ApiError('Order not found', 404);
    }
    order.status = status;
    order.statusHistory.push({ status, note });
    order.updatedAt = Date.now();
    await order.save();
    logger.info(`Order ${req.params.id} status updated to ${status}`);
    res.status(200).json({
      success: true,
      data: order,
      message: 'Order status updated',
    });
  } catch (error) {
    logger.error(`Update order status failed: ${error.message}`);
    next(error);
  }
};

module.exports = { createOrder, getOrder, updateOrderStatus };













// const orderService = require('../services/orderService');
// const { ApiError } = require('../utils/errorHandler');
// const logger = require('../utils/logger');

// class OrderController {
//   async createOrder(req, res) {
//     try {
//       const userId = req.user._id; // From auth middleware
//       const order = await orderService.createOrder(userId, req.body);
//       res.status(201).json({
//         success: true,
//         data: order,
//         message: 'Order created successfully',
//       });
//     } catch (error) {
//       logger.error(`Create order failed: ${error.message}`);
//       res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   async getOrder(req, res) {
//     try {
//       const order = await orderService.getOrder(req.params.id, req.user._id);
//       res.status(200).json({
//         success: true,
//         data: order,
//       });
//     } catch (error) {
//       logger.error(`Get order failed: ${error.message}`);
//       res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   async updateOrderStatus(req, res) {
//     try {
//       const { status, note } = req.body;
//       const order = await orderService.updateOrderStatus(req.params.id, status, note);
//       res.status(200).json({
//         success: true,
//         data: order,
//         message: 'Order status updated',
//       });
//     } catch (error) {
//       logger.error(`Update order status failed: ${error.message}`);
//       res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }

// module.exports = new OrderController();