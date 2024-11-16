import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();

// Sample Users Data
const users = [{
        name: 'Admin User',
        email: 'admin@cakeshop.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user'
    }
];

// Sample Products/Cakes Data
const products = [{
        name: 'Classic Birthday Cake',
        category: 'Birthday',
        description: 'A traditional birthday cake with vanilla frosting',
        basePrice: 45.99,
        sizes: ['Small', 'Medium', 'Large'],
        flavors: ['Vanilla', 'Chocolate', 'Strawberry'],
        images: ['birthday-cake-1.jpg'],
        customizable: true
    },
    {
        name: 'Wedding Elegance',
        category: 'Wedding',
        description: 'Elegant three-tier wedding cake with white fondant',
        basePrice: 299.99,
        sizes: ['Medium', 'Large', 'Extra Large'],
        flavors: ['Vanilla', 'Red Velvet', 'Champagne'],
        images: ['wedding-cake-1.jpg'],
        customizable: true
    },
    {
        name: 'Chocolate Delight',
        category: 'Custom',
        description: 'Rich chocolate cake with ganache filling',
        basePrice: 55.99,
        sizes: ['Small', 'Medium', 'Large'],
        flavors: ['Dark Chocolate', 'Milk Chocolate'],
        images: ['chocolate-cake-1.jpg'],
        customizable: true
    },
    {
        name: 'Cupcake Pack',
        category: 'Cupcakes',
        description: 'Assorted cupcakes pack',
        basePrice: 24.99,
        sizes: ['6 Pack', '12 Pack'],
        flavors: ['Mixed', 'All Chocolate', 'All Vanilla'],
        images: ['cupcakes-1.jpg'],
        customizable: false
    }
];

// Sample Orders Data
const generateOrders = (userIds) => {
    const orders = [];
    const statuses = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
    const deliveryTimes = ['Morning', 'Afternoon', 'Evening'];

    userIds.forEach(userId => {
        const numOrders = Math.floor(Math.random() * 3) + 1; // 1-3 orders per user

        for (let i = 0; i < numOrders; i++) {
            const date = new Date();
            date.setDate(date.getDate() + Math.floor(Math.random() * 30)); // Random date within next 30 days

            orders.push({
                user: userId,
                cakeType: products[Math.floor(Math.random() * products.length)].category,
                size: 'Medium',
                flavor: 'Vanilla',
                message: `Sample Order ${i + 1}`,
                specialInstructions: 'Please handle with care',
                deliveryDate: date,
                deliveryTime: deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                price: Math.floor(Math.random() * 100) + 50 // Random price between 50-150
            });
        }
    });

    return orders;
};

// ... previous code ...

const seedDatabase = async() => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB:', process.env.MONGODB_URI);

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Order.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing data');

        // Seed Users
        console.log('Seeding users...');
        const hashedUsers = await Promise.all(users.map(async user => ({
            ...user,
            password: await bcrypt.hash(user.password, 12)
        })));
        const createdUsers = await User.insertMany(hashedUsers);
        console.log('Users seeded:', createdUsers.length);

        // Seed Products
        console.log('Seeding products...');
        const createdProducts = await Product.insertMany(products);
        console.log('Products seeded:', createdProducts.length);
        console.log('Product IDs:', createdProducts.map(p => p._id));

        // Seed Orders
        console.log('Seeding orders...');
        const userIds = createdUsers.map(user => user._id);
        const orders = generateOrders(userIds);
        const createdOrders = await Order.insertMany(orders);
        console.log('Orders seeded:', createdOrders.length);

        console.log('Database seeding completed!');

        // Verify data
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const orderCount = await Order.countDocuments();

        console.log('Final counts:');
        console.log('Users:', userCount);
        console.log('Products:', productCount);
        console.log('Orders:', orderCount);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        console.error('Error details:', error.message);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`Validation error for ${key}:`, error.errors[key].message);
            });
        }
        process.exit(1);
    }
};

// Run seeder
seedDatabase();