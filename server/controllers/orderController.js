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

exports.getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.find({ 'user.id': userId }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error, message: "Failed to fetch orders" });
    }
  };
