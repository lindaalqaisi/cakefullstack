import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';
import productRoutes from './routes/product.routes.js';

import { connectDB, createIndexes } from './config/database.js';

// Initialize express app
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date()
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            status: 400,
            message: `Duplicate value for ${field}`,
            field
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            status: 401,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            status: 401,
            message: 'Token expired'
        });
    }

    // Default error
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(status).json({
        success: false,
        status,
        message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack
        })
    });
});

// Database connection with retry
const connectWithRetry = async() => {
    const MAX_RETRIES = 5;
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                maxPoolSize: 50,
                wtimeoutMS: 2500,
                useNewUrlParser: true
            });
            console.log('📦 Connected to MongoDB');
            break;
        } catch (err) {
            retries += 1;
            console.error(`MongoDB connection attempt ${retries} failed:`, err);
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    if (retries === MAX_RETRIES) {
        console.error('Could not connect to MongoDB. Exiting...');
        process.exit(1);
    }
};

// Start server
const startServer = async() => {
    try {
        // Connect to database
        await connectDB();

        // Create database indexes
        await createIndexes();

        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📝 API Documentation: http://localhost:${PORT}/api-docs`);
            console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Process terminated!');
            });
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Give the server a grace period to finish pending requests
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});



// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Give the server a grace period to finish pending requests
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

// Start the server
startServer();

export default app;