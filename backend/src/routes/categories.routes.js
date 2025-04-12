const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categories.controller');
const validateRequest = require('../middlewares/validate.request');
const { categorySchema } = require('../validators/categoryValidator');

categoryRouter.post('/', validateRequest(categorySchema), categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategory);
categoryRouter.put('/:id', validateRequest(categorySchema), categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = {categoryRouter};