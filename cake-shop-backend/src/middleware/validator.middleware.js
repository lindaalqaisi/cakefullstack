import { body } from 'express-validator';

export const registerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const orderValidator = [
    body('cakeType').notEmpty().withMessage('Cake type is required'),
    body('size').notEmpty().withMessage('Size is required'),
    body('flavor').notEmpty().withMessage('Flavor is required'),
    body('deliveryDate').isDate().withMessage('Valid delivery date is required'),
    body('deliveryTime').notEmpty().withMessage('Delivery time is required'),
    body('price').isNumeric().withMessage('Valid price is required')
];


export const validateProduct = (req, res, next) => {
    const { name, category, description, basePrice, sizes, flavors } = req.body;

    // Required fields
    if (!name || !category || !description || !basePrice) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    // Category validation
    const validCategories = ['Birthday', 'Wedding', 'Custom', 'Cupcakes'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid category'
        });
    }

    // Size validation
    const validSizes = ['Small', 'Medium', 'Large', 'Extra Large', '6 Pack', '12 Pack'];
    if (sizes && sizes.length > 0) {
        const invalidSizes = sizes.filter(size => !validSizes.includes(size));
        if (invalidSizes.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Invalid sizes: ${invalidSizes.join(', ')}`
            });
        }
    }

    // Base price validation
    if (typeof basePrice !== 'number' || basePrice <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Base price must be a positive number'
        });
    }

    // Name length validation
    if (name.length > 100) {
        return res.status(400).json({
            success: false,
            message: 'Name cannot be more than 100 characters'
        });
    }

    // Description length validation
    if (description.length > 500) {
        return res.status(400).json({
            success: false,
            message: 'Description cannot be more than 500 characters'
        });
    }

    next();
};


export const validateUpdateProfile = [
    body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

    body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),

    body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

    body('currentPassword')
    .if(body('password').exists())
    .notEmpty()
    .withMessage('Current password is required when updating password')
];

export const validateAdminUserUpdate = [
    body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

    body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),

    body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Invalid role'),

    body('active')
    .optional()
    .isBoolean()
    .withMessage('Active must be a boolean')
];