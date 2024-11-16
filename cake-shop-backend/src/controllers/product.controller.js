import { Product } from '../models/product.model.js';
import { createError } from '../utils/error.js';

/**
 * Get all products with filtering, sorting, and pagination
 * @route GET /api/products
 */
export const getAllProducts = async(req, res, next) => {
    try {
        const {
            category,
            sort = 'createdAt',
            order = 'desc',
            search,
            minPrice,
            maxPrice,
            page = 1,
            limit = 10,
            customizable
        } = req.query;

        // Build query object
        const query = { active: true };

        // Apply filters
        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            query.basePrice = {};
            if (minPrice) query.basePrice.$gte = Number(minPrice);
            if (maxPrice) query.basePrice.$lte = Number(maxPrice);
        }

        if (customizable !== undefined) {
            query.customizable = customizable === 'true';
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Build sort object
        const sortObj = {};
        sortObj[sort] = order === 'desc' ? -1 : 1;

        // Execute query with pagination
        const [products, total] = await Promise.all([
            Product.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v'),
            Product.countDocuments(query)
        ]);

        // Send response
        res.json({
            success: true,
            data: products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single product by ID
 * @route GET /api/products/:id
 */
export const getProductById = async(req, res, next) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            active: true
        }).select('-__v');

        if (!product) {
            return next(createError(404, 'Product not found'));
        }

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid product ID'));
        }
        next(err);
    }
};

/**
 * Create a new product (Admin only)
 * @route POST /api/products
 */
export const createProduct = async(req, res, next) => {
    try {
        // Validate required fields
        const {
            name,
            category,
            description,
            basePrice,
            sizes,
            flavors
        } = req.body;

        if (!name || !category || !description || !basePrice) {
            return next(createError(400, 'Please provide all required fields'));
        }

        // Create new product
        const product = new Product({
            name,
            category,
            description,
            basePrice,
            sizes: sizes || [],
            flavors: flavors || [],
            customizable: req.body.customizable??true,
            active: true,
            images: req.body.images || []
        });

        // Save product
        await product.save();

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(createError(400, err.message));
        }
        next(err);
    }
};

/**
 * Update a product (Admin only)
 * @route PUT /api/products/:id
 */
export const updateProduct = async(req, res, next) => {
    try {
        const updates = {...req.body };

        // Validate price if provided
        if (updates.basePrice && updates.basePrice <= 0) {
            return next(createError(400, 'Price must be greater than 0'));
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, { $set: updates }, {
                new: true,
                runValidators: true,
                select: '-__v'
            }
        );

        if (!product) {
            return next(createError(404, 'Product not found'));
        }

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(createError(400, err.message));
        }
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid product ID'));
        }
        next(err);
    }
};

/**
 * Delete a product (Admin only)
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async(req, res, next) => {
    try {
        // Soft delete by setting active to false
        const product = await Product.findByIdAndUpdate(
            req.params.id, { $set: { active: false } }, { new: true }
        );

        if (!product) {
            return next(createError(404, 'Product not found'));
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid product ID'));
        }
        next(err);
    }
};

/**
 * Get all product categories
 * @route GET /api/products/categories
 */
export const getCategories = async(req, res, next) => {
    try {
        const categories = await Product.distinct('category', { active: true });

        res.json({
            success: true,
            data: categories
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get product sizes
 * @route GET /api/products/sizes
 */
export const getSizes = async(req, res, next) => {
    try {
        const sizes = await Product.distinct('sizes', { active: true });

        res.json({
            success: true,
            data: sizes
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Get product flavors
 * @route GET /api/products/flavors
 */
export const getFlavors = async(req, res, next) => {
    try {
        const flavors = await Product.distinct('flavors', { active: true });

        res.json({
            success: true,
            data: flavors
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Bulk update products (Admin only)
 * @route PATCH /api/products/bulk
 */
export const bulkUpdateProducts = async(req, res, next) => {
    try {
        const { updates } = req.body;

        if (!Array.isArray(updates) || updates.length === 0) {
            return next(createError(400, 'Invalid updates array'));
        }

        const operations = updates.map(update => ({
            updateOne: {
                filter: { _id: update.id },
                update: { $set: update.data }
            }
        }));

        await Product.bulkWrite(operations);

        res.json({
            success: true,
            message: `Successfully updated ${updates.length} products`
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return next(createError(400, err.message));
        }
        next(err);
    }
};