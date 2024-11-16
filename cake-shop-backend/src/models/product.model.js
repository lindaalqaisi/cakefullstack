import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Birthday', 'Wedding', 'Custom', 'Cupcakes']
    },
    description: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    sizes: [{
        type: String,
        enum: ['Small', 'Medium', 'Large', 'Extra Large', '6 Pack', '12 Pack']
    }],
    flavors: [{
        type: String
    }],
    images: [{
        type: String
    }],
    customizable: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);