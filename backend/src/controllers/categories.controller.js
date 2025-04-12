const Category = require('../models/categories.model');
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const logger = require('../utils/logger');

const createCategory = async (req, res) => {
    try {
        const { name, description, parent_category, image_url } = req.body;

        const category = new Category({
            name,
            description,
            parent_category: parent_category || null,
            image_url: image_url || null
        });

        await category.save();
        logger.info(`Category created: ${category._id}`);
        return res.status(201).json(new ApiResponse(201, category, "Category created successfully!", true))
    } catch (error) {
        logger.error(`Error creating category: ${error.message}`);
        throw new ApiError(500, `Error creating category: ${error.message}`)
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('parent_category', 'name')
            .sort({ createdAt: -1 })
            .lean();
        logger.info('Fetched all categories');
        return res.status(200).json(new ApiResponse(200, categories))
    } catch (error) {
        logger.error(`Error fetching categories: ${error.message}`);
        throw new ApiError(500, `Error fetching categories: ${error.message}`)
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('parent_category', 'name')
            .lean();

        if (!category) {
            logger.warn(`Category not found: ${req.params.id}`);
            return res.status(404).json(new ApiError(404, 'Category not found'));
        }

        logger.info(`Fetched category: ${category._id}`);
        return res.status(200).json(new ApiResponse(200, categories))
    } catch (error) {
        logger.error(`Error fetching category ${req.params.id}: ${error.message}`);
        throw new ApiError(500, `Error fetching category ${req.params.id}: ${error.message}`);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name, description, parent_category, image_url } = req.body;

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                parent_category: parent_category || null,
                image_url: image_url || null,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        ).lean();

        if (!category) {
            logger.warn(`Category not found for update: ${req.params.id}`);
            return res.status(404).json(new ApiError(404, 'Category not found'));
        }

        logger.info(`Category updated: ${category._id}`);
        return res.status(200).json(new ApiResponse(200, category, "Category updated successfully!", true))
        
    } catch (error) {
        logger.error(`Error updating category ${req.params.id}: ${error.message}`);
        throw new ApiError(500, `Error updating category ${req.params.id}: ${error.message}`);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const subCategories = await Category.find({ parent_category: req.params.id });
        if (subCategories.length > 0) {
            logger.warn(`Attempted to delete category with subcategories: ${req.params.id}`);
            return res.status(400).json({
                error: 'Cannot delete category with subcategories'
            });
        }

        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            logger.warn(`Category not found for deletion: ${req.params.id}`);
            return res.status(404).json(new ApiError(404, `Category not found ${req.params.id}!`))
        }

        logger.info(`Category deleted: ${req.params.id}`);
        res.status(200).json(new ApiResponse(200,_, "Category deleted successfully!", true))
    } catch (error) {
        logger.error(`Error deleting category ${req.params.id}: ${error.message}`);
        throw new ApiError(500, `Error deleting category ${req.params.id}: ${error.message}!`)
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
}