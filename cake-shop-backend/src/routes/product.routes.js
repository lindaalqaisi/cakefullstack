import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getSizes,
    getFlavors,
    bulkUpdateProducts
} from '../controllers/product.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';
import { validateProduct } from '../middleware/validator.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/sizes', getSizes);
router.get('/flavors', getFlavors);
router.get('/:id', getProductById);

// Admin only routes
router.use(verifyToken, verifyAdmin);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/bulk', bulkUpdateProducts);

export default router;