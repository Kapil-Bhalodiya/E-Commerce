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
<<<<<<< HEAD
    // try {
    //     const products = await Product.find().populate('subcategory');
    //     return res.status(200).json(new ApiResponse(200, products, 'Products fetched successfully!', true));
    // } catch (error) {
    //     logger.error(`Error fetching products: ${error.message}`);
    //     throw new ApiError(500, 'Error fetching products');
    // }
    try {
        const { page = 1, limit = 2, minPrice, maxPrice, brands, occasion } = req.query;
        const query = {};
    
        if (minPrice && maxPrice) {
          query.base_price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        }
        if (brands) {
          query.brand = { $in: brands.split(',') };
        }
        if (occasion) {
          query.occasion = { $in: occasion.split(',') };
        }
    
        const products = await Product.find(query)
          .populate('variant_ids')
          .skip((page - 1) * limit)
          .limit(Number(limit));
    
        const total = await Product.countDocuments(query);
    
        return res.status(200).json(new ApiResponse(200, {
          products,
          total,
          page: Number(page),
          pages: Math.ceil(total / limit)
        }, 'Products fetched successfully!', true));
      } catch (error) {
        logger.error(`Error fetching products: ${error.message}`);
        return res.status(500).json(new ApiResponse(500, null, 'Error fetching products', false));
      }
=======
  // try {
  //     const products = await Product.find().populate('subcategory');
  //     return res.status(200).json(new ApiResponse(200, products, 'Products fetched successfully!', true));
  // } catch (error) {
  //     logger.error(`Error fetching products: ${error.message}`);
  //     throw new ApiError(500, 'Error fetching products');
  // }
  try {
    const { page = 1, limit = 2, minPrice, maxPrice, brands, occasion } = req.query;
    const query = {};

    // if (minPrice && maxPrice) {
    //   query.base_price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    // }
    // if (brands) {
    //   query.brand = { $in: brands.split(',') };
    // }
    // if (occasion) {
    //   query.occasion = { $in: occasion.split(',') };
    // }

    const products = await Product.find(query)
      .populate('variant_ids')
      .populate('subcategory', 'name category_id');

    const total = await Product.countDocuments(query);

    return res.status(200).json(new ApiResponse(200, {
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    }, 'Products fetched successfully!', true));
  } catch (error) {
    logger.error(`Error fetching products: ${error.message}`);
    return res.status(500).json(new ApiResponse(500, null, 'Error fetching products', false));
  }
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('subcategory', 'name')
      .populate('variant_ids');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}