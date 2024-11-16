import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cakeType: {
        type: String,
        required: true,
        enum: ['Birthday', 'Wedding', 'Custom', 'Cupcakes']
    },
    size: {
        type: String,
        required: true,
        enum: ['Small', 'Medium', 'Large', 'Extra Large']
    },
    flavor: {
        type: String,
        required: true
    },
    message: String,
    specialInstructions: String,
    deliveryDate: {
        type: Date,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);