const express = require('express');
const subCategoryRoutes = express.Router();
const subCategoryController = require('../controllers/subcategories.controller');
const validateRequest = require('../middlewares/validate.request');
const { subCategorySchema } = require('../validators/subCategoryValidator');
const { createUpload } = require('../utils/multer.config');

subCategoryRoutes.post('/',
    createUpload('subcategory').single('image'),
    validateRequest(subCategorySchema),
    subCategoryController.createSubCategory
);
subCategoryRoutes.get('/', subCategoryController.getAllSubCategories);
subCategoryRoutes.get('/:id', subCategoryController.getSubCategory);
subCategoryRoutes.put('/:id', validateRequest(subCategorySchema), subCategoryController.updateSubCategory);
subCategoryRoutes.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = { subCategoryRoutes };