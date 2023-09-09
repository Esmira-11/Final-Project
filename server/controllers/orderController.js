const Order = require('../models/Order');
const Cart = require('../models/Cart')

exports.addToOrder = async (req, res) => {
    try {
        const { user, products, shippingDetails,totalPrice } = req.body;

        const order = new Order({ user, products, shippingDetails, totalPrice });

        await Cart.deleteMany({ user: req.user.id });

        await order.save();
    
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            error,
            message: "Failed to place the order",
        });
    }
}
