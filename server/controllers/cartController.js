const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const newCart = new Cart({
      user: req.user.id,
      product: productId,
    });
    await newCart.save();
    res.json({ message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    await Cart.findOneAndDelete({ user: req.user.id, product: productId });
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
    // console.log(req.user.id)
  try {
    const cart = await Cart.find({ user: req.user.id }).populate('product').select("-product.photo");
    // console.log(favorites)
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};