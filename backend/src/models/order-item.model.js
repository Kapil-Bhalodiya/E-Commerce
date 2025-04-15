const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // Price at time of order
  subtotal: { type: Number, required: true }, // quantity * price
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);