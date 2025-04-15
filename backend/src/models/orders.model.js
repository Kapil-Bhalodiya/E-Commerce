const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  shippingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String },
    street: { type: String, required: true },
    street2: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  totalAmount: { type: Number, required: true }, // After discounts, taxes, shipping
  subTotal: { type: Number, required: true }, // Before taxes, shipping
  taxAmount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  couponCode: { type: String, default: null },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String,
  }],
  notes: { type: String, default: null }, // Customer comments
  isDeleted: { type: Boolean, default: false }, // Soft delete
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ isDeleted: 1 });

module.exports = mongoose.model('Order', orderSchema);