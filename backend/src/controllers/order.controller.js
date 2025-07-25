const mongoose = require('mongoose');
const Order = require('../models/orders.model');
const OrderItem = require('../models/order-item.model');
const Payment = require('../models/payments.model');
const Product = require('../models/product.model');
const Coupon = require('../models/coupons.model');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/ApiError');
const { createAddress } = require('./addresses.controller');

const createOrder = async (req, res, next) => {

  const session = await mongoose.startSession();
  let isTransactionCommitted = false;
  
  try {
    session.startTransaction();
    
    const userId = req.body.userData?._id || req.userId;
    const { cartForm, deliveryAddressForm, paymentDetailForm, couponCode } = req.body.orderData;

    let deliveryAddressId;

    if (deliveryAddressForm.deliveryAddressId) {
      logger.info('Using existing deliveryAddressId', { deliveryAddressId: deliveryAddressForm.deliveryAddressId });
      deliveryAddressId = deliveryAddressForm.deliveryAddressId;
    } else {
      logger.info('Creating new address with input', deliveryAddressForm.newAddress);
      const address = await createAddress(userId, deliveryAddressForm.newAddress, session);
      logger.info('New address created', { addressId: address._id });
      deliveryAddressId = address._id;
    }

    // Create order items
    const orderItems = [];
    let subTotal = 0;

    for (const item of cartForm.items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new ApiError(`Product ${item.productId} is unavailable or out of stock`, 400);
      }
      logger.debug('Processing product', { productId: product._id, stock: product.stock });
      const orderItem = new OrderItem({
        productId: item.productId,
        quantity: item.quantity,
        price: product.base_price,
        subtotal: item.price * item.quantity,
      });

      await orderItem.save({ session });
      orderItems.push(orderItem._id);
      subTotal += orderItem.subtotal;

      // Update product stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Calculate taxes and shipping
    const taxRate = 0.1;
    const taxAmount = subTotal * taxRate;
    const shippingCost = 10;

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

    // Create order
    const order = new Order({
      userId,
      orderItems,
      deliveryAddressId,
      payment: null,
      totalAmount,
      subTotal,
      taxAmount,
      shippingCost,
      discountAmount,
      couponCode: appliedCouponCode,
      status: 'pending',
      statusHistory: [{ status: 'pending', note: 'Order created' }],
    });

    await order.save({ session });

    const payment = new Payment({
      userId,
      orderId: order._id,
      amount: totalAmount,
      method: paymentDetailForm.method,
      status: 'pending',
      provider: paymentDetailForm.provider,
      stripePaymentIntentId: paymentDetailForm.stripePaymentIntentId,
    });

    logger.debug('Creating payment', { orderId: order._id, amount: totalAmount });
    await payment.validate();
    await payment.save({ session });

    order.payment = payment._id;
    await order.save({ session });

    await session.commitTransaction();
    isTransactionCommitted = true;
    logger.info(`Order created successfully: ${order._id}`)

    let populatedOrder;
    try {
      populatedOrder = await Order.findById(order._id)
        .populate('orderItems deliveryAddressId payment')
        .exec();
      if (!populatedOrder) {
        throw new Error('Failed to populate order');
      }
    } catch (populateError) {
      logger.error(`Failed to populate order: ${populateError.message}`);
      populatedOrder = await Order.findById(order._id).exec();
    }

    res.status(201).json({
      success: true,
      data: {
        order: populatedOrder
      },
      message: 'Order created successfully',
    });
  } catch (error) {
    if (!isTransactionCommitted) {
      await session.abortTransaction();
    }
    logger.error(`Order creation failed: ${error.message}`, { error });
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

// List all orders (for dashboard, admin, etc.)
const listOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('userId status totalAmount createdAt orderItems')
      .populate('userId', 'fullName email')
      .populate({ path: 'orderItems', select: 'quantity' });

    const totalOrders = await Order.countDocuments();

    // Format for dashboard: id, date, status, total, items
    const formattedOrders = orders.map(order => ({
      id: order._id,
      user: order.userId,
      date: order.createdAt,
      status: order.status,
      total: order.totalAmount,
      items: order.orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
    }));

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        totalOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrder, updateOrderStatus, listOrders };