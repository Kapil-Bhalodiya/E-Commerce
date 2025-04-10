const mongoose = require('mongoose');
const productVariationSchema = new mongoose.Schema(
  {
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
        index: true
    },
    color: {
        type: String,
        required: true, 
        enum: ['Red', 'Blue', 'Green', 'Black', 'White'],
    },
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    stock_quantity: {
        type: Number,
        default: 0,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image_url: {
        type: String,
        default: null, 
    },
  },
  {
      timestamps: true
  }
);

const ProductVariation = mongoose.model('ProductVariation', productVariationSchema);

module.exports = ProductVariation;




// {
//     "_id": ObjectId("..."),
//     "product_id": ObjectId("..."),  // Reference to the parent Product
//     "color": "Red",
//     "size": "M",
//     "stock_quantity": 100,
//     "price": 20.00,
//     "image_url": "/images/products/whale-tshirt-red.jpg",
//     "created_at": ISODate("2025-04-09T00:00:00Z")
//   }
//   {
//     "_id": ObjectId("60f8d4d4f5f5e839205cf3d3"),
//     "product_id": ObjectId("60f8d4d4f5f5e839205cf3d2"),  // Reference to the parent product
//     "color": "Red",
//     "size": "M",
//     "price": 19.99,
//     "stock_quantity": 15,
//     "image_url": "/images/products/shark-tshirt-red-m.jpg"
//   }
  