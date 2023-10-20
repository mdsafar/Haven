import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import mongoose from "mongoose"

export const newOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
        const newOrder = new Order({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingInfo,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        })
        await newOrder.save()
        return res.status(201).json({
            success: true,
            newOrder
        })
    } catch (err) {
        console.log(err)
        return res.status(404).json({
            success: false,
            message: "Fail to Get"
        })
    }
}

export const getSingleOrder = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID format"
            });
        }

        const order = await Order.findById(new mongoose.Types.ObjectId(id)).populate('user', "name email")

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found with this Id"
            })
        }
        return res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}

export const myOrder = async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id }).populate("user", "name")

        return res.status(200).json({
            success: true,
            totalOrders: order.length,
            order
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        let totalAmount = 0

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Orders"
            })
        }
        orders.forEach((orders) => {
            totalAmount += orders.totalPrice
        })
        return res.status(200).json({
            success: true,
            totalAmount,
            totalOrders: orders.length,
            orders
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found with this Id"
            })
        }
        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "You have already delivered this order",
            });
        }

        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (orders) => {
                await updateStock(orders.product, orders.quantity)
            })
        }

        order.orderStatus = req.body.status

        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now()
        }

        await order.save({ validateBeforeSave: false })
        return res.status(200).json({
            success: true,
            order
        })

        async function updateStock(id, quantity) {
            const product = await Product.findById(id)

            product.Stock -= quantity

            await product.save({ validateBeforeSave: false })
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found with this Id"
            })
        }
        await order.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}