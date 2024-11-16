import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';

/**
 * Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
export const getProfile = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
export const updateProfile = async(req, res, next) => {
    try {
        const { name, email, password, currentPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(createError(404, 'User not found'));
        }

        // If trying to update password, verify current password
        if (password) {
            if (!currentPassword) {
                return next(createError(400, 'Current password is required'));
            }

            const isPasswordValid = await user.comparePassword(currentPassword);
            if (!isPasswordValid) {
                return next(createError(401, 'Current password is incorrect'));
            }

            user.password = password;
        }

        // Check if email is being changed and if it's already in use
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return next(createError(400, 'Email already in use'));
            }
            user.email = email;
        }

        if (name) user.name = name;

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete user profile
 * @route DELETE /api/users/profile
 * @access Private
 */
export const deleteProfile = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: 'User profile deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get all users (Admin only)
 * @route GET /api/users
 * @access Admin
 */
export const getAllUsers = async(req, res, next) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await User.countDocuments(query);

        res.json({
            success: true,
            data: users,
            pagination: {
                total: count,
                page: parseInt(page),
                pages: Math.ceil(count / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get user by ID (Admin only)
 * @route GET /api/users/:id
 * @access Admin
 */
export const getUserById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Update user (Admin only)
 * @route PUT /api/users/:id
 * @access Admin
 */
export const updateUser = async(req, res, next) => {
    try {
        const { name, email, role, active } = req.body;

        // Prevent updating own admin account
        if (req.params.id === req.user.id) {
            return next(createError(403, 'Admin cannot update their own account through this endpoint'));
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        // Check if email is being changed and if it's already in use
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return next(createError(400, 'Email already in use'));
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (role) user.role = role;
        if (typeof active !== 'undefined') user.active = active;

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                active: updatedUser.active
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete user (Admin only)
 * @route DELETE /api/users/:id
 * @access Admin
 */
export const deleteUser = async(req, res, next) => {
    try {
        // Prevent deleting own admin account
        if (req.params.id === req.user.id) {
            return next(createError(403, 'Admin cannot delete their own account'));
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Change user password (Admin only)
 * @route PUT /api/users/:id/password
 * @access Admin
 */
export const changeUserPassword = async(req, res, next) => {
    try {
        const { newPassword } = req.body;

        // Prevent changing own admin password
        if (req.params.id === req.user.id) {
            return next(createError(403, 'Admin cannot change their own password through this endpoint'));
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'User password updated successfully'
        });
    } catch (err) {
        next(err);
    }
};