const Product = require('../models/product.model');
const SubCategory = require('../models/sub-categories.model');
const logger = require('../utils/logger');
const {ApiResponse} = require('../utils/ApiResponse');
const {ApiError} = require('../utils/ApiError');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, brand, subcategory, base_price, tags } = req.body;
        let image_urls = [];
    
        if (!req.files || req.files.length < 1) throw new ApiError(400, 'At least one image required');
        if (req.files.length > 10) throw new ApiError(400, 'Maximum 10 images allowed');
    
        image_urls = req.files.map(file => 
          `${req.protocol}://${req.get('host')}/uploads/product/${file.filename}`
        );
    
        const subCategory = await SubCategory.findById(subcategory);
        if (!subCategory) throw new ApiError(404, 'SubCategory not found');
    
        const product = new Product({
          name,
          description,
          brand,
          subcategory,
          base_price,
          tags: tags ? JSON.parse(tags) : [],
          image_urls,
          variant_ids: []
        });
    
        await product.save();
        logger.info(`Product created: ${product._id}`);
        return res.status(201).json(new ApiResponse(201, product, 'Product created successfully!', true));
      } catch (error) {
        logger.error(`Error creating product: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error creating product');
      }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('subcategory');
        return res.status(200).json(new ApiResponse(200, products, 'Products fetched successfully!', true));
    } catch (error) {
        logger.error(`Error fetching products: ${error.message}`);
        throw new ApiError(500, 'Error fetching products');
    }
};