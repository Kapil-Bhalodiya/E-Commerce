const SubCategory = require('../models/sub-categories.model');
const Category = require('../models/categories.model');
const logger = require('../utils/logger');
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const createSubCategory = async (req, res) => {
    try {
        const { name, description, category_id } = req.body;
        let image_url = null;

        if (req.file) {
            image_url = `${req.protocol}://${req.get('host')}/uploads/subcategory/${req.file.filename}`;
        }

        // Validate category_id
        const category = await Category.findById(category_id);
        if (!category) {
            logger.warn(`Category not found: ${category_id}`);
            throw new ApiError(404, 'Category not found');
        }

        const subCategory = new SubCategory({
            name,
            description,
            category_id,
            image_url
        });

        await subCategory.save();
        logger.info(`SubCategory created: ${subCategory._id}`);
        return res.status(201).json(new ApiResponse(201, subCategory, 'SubCategory created successfully!', true));
    } catch (error) {
        logger.error(`Error creating subcategory: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error creating subcategory');
    }
};

const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find()
            .populate('category_id', 'name')
            .sort({ createdAt: -1 })
            .lean();
        logger.info('Fetched all subcategories');
        return res.status(200).json(new ApiResponse(200, subCategories, 'SubCategories retrieved successfully!', true));
    } catch (error) {
        logger.error(`Error fetching subcategories: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error fetching subcategories');
    }
};

const getSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id)
            .populate('category_id', 'name')
            .lean();

        if (!subCategory) {
            logger.warn(`SubCategory not found: ${req.params.id}`);
            throw new ApiError(404, 'SubCategory not found');
        }

        logger.info(`Fetched subcategory: ${subCategory._id}`);
        return res.status(200).json(new ApiResponse(200, subCategory, 'SubCategory retrieved successfully!', true));
    } catch (error) {
        logger.error(`Error fetching subcategory ${req.params.id}: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error fetching subcategory');
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { name, description, category_id, image_url } = req.body;

        // Verify category exists if provided
        if (category_id) {
            const category = await Category.findById(category_id);
            if (!category) {
                logger.warn(`Category not found: ${category_id}`);
                throw new ApiError(404, 'Parent category not found');
            }
        }

        const subCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                category_id,
                image_url: image_url || null,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        ).lean();

        if (!subCategory) {
            logger.warn(`SubCategory not found for update: ${req.params.id}`);
            throw new ApiError(404, 'SubCategory not found');
        }

        logger.info(`SubCategory updated: ${subCategory._id}`);
        return res.status(200).json(new ApiResponse(200, subCategory, 'SubCategory updated successfully!', true));
    } catch (error) {
        logger.error(`Error updating subcategory ${req.params.id}: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error updating subcategory');
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

        if (!subCategory) {
            logger.warn(`SubCategory not found for deletion: ${req.params.id}`);
            throw new ApiError(404, 'SubCategory not found');
        }

        logger.info(`SubCategory deleted: ${req.params.id}`);
        return res.status(200).json(new ApiResponse(200, null, 'SubCategory deleted successfully!', true));
    } catch (error) {
        logger.error(`Error deleting subcategory ${req.params.id}: ${error.message}`);
        throw new ApiError(error.status || 500, error.message || 'Error deleting subcategory');
    }
};

module.exports = {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories
}