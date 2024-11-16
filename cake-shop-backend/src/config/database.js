import mongoose from 'mongoose';

// MongoDB connection options
export const dbOptions = {
    maxPoolSize: 50,
    minPoolSize: 10,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 10000,
};

// Connect to MongoDB
export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, dbOptions);
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);

        // Add event listeners for connection status
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected!');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        // Graceful shutdown
        process.on('SIGINT', async() => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error closing MongoDB connection:', err);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Create indexes for better query performance
export const createIndexes = async() => {
    try {
        // Add any indexes you need here
        // Example:
        // await User.createIndexes();
        // await Product.createIndexes();
        console.log('Database indexes created successfully');
    } catch (error) {
        console.error('Error creating database indexes:', error);
    }
};