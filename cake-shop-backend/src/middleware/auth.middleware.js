import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
import { User } from '../models/user.model.js';

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(createError(401, 'Authentication required'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(createError(404, 'User not found'));
        }

        req.user = user;
        next();
    } catch (err) {
        next(createError(401, 'Invalid token'));
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(createError(403, 'Admin access required'));
    }
    next();
};