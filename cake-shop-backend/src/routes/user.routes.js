import express from 'express';
import {
    getProfile,
    updateProfile,
    deleteProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// User routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.delete('/profile', verifyToken, deleteProfile);

// Admin routes
router.get('/', verifyToken, verifyAdmin, getAllUsers);
router.get('/:id', verifyToken, verifyAdmin, getUserById);
router.put('/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;