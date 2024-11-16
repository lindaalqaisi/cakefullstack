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

export const validateProduct = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name must be less than 100 characters'),

    body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Birthday', 'Wedding', 'Custom', 'Cupcakes'])
    .withMessage('Invalid category'),

    body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),

    body('basePrice')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value > 0)
    .withMessage('Price must be greater than 0'),

    body('sizes')
    .optional()
    .isArray()
    .withMessage('Sizes must be an array'),

    body('sizes.*')
    .isIn(['Small', 'Medium', 'Large', 'Extra Large', '6 Pack', '12 Pack'])
    .withMessage('Invalid size'),

    body('flavors')
    .optional()
    .isArray()
    .withMessage('Flavors must be an array'),

    body('customizable')
    .optional()
    .isBoolean()
    .withMessage('Customizable must be a boolean'),

    body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),

    body('images.*')
    .isURL()
    .withMessage('Invalid image URL')
];



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