import express from 'express';
import {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
} from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { orderValidator } from '../middleware/validator.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', orderValidator, createOrder);
router.get('/', getOrders);
router.put('/:id', orderValidator, updateOrder);
router.delete('/:id', deleteOrder);

export default router;