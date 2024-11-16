import { Order } from '../models/order.model.js';
import { createError } from '../utils/error.js';

export const createOrder = async(req, res, next) => {
    try {
        const order = new Order({
            ...req.body,
            user: req.user.id
        });
        await order.save();

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

export const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id });

        res.json({
            success: true,
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

export const updateOrder = async(req, res, next) => {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.id, user: req.user.id },
            req.body, { new: true }
        );

        if (!order) {
            return next(createError(404, 'Order not found'));
        }

        res.json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

export const deleteOrder = async(req, res, next) => {
    try {
        const order = await Order.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!order) {
            return next(createError(404, 'Order not found'));
        }

        res.json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};