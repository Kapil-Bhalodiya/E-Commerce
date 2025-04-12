const mongoose = require('mongoose');
const productVariationSchema = new mongoose.Schema(
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
      color: { type: String, required: true, enum: ['Red', 'Blue', 'Green', 'Black', 'White', 'Pink', 'Rust Orange', 'Dark Nevy', 'Purple', 'Khaki'] },
      size: { type: String, required: true, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
      stock_quantity: { type: Number, default: 0, required: true, min: 0 },
      price: { type: Number, required: true, min: 0 }
    },
    { timestamps: true }
  );
  productVariationSchema.index({ product_id: 1, color: 1, size: 1 }, { unique: true });
const ProductVariation = mongoose.model('ProductVariation', productVariationSchema);

module.exports = ProductVariation;
  