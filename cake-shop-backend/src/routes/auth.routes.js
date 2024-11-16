import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerValidator } from '../middleware/validator.middleware.js';

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', login);

export default router;