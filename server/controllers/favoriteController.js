const Favorite = require('../models/Favorite');

exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const newFavorite = new Favorite({
      user: req.user.id,
      product: productId,
    });
    await newFavorite.save();
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    await Favorite.findOneAndDelete({ user: req.user.id, product: productId });
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
    // console.log(req.user.id)
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('product');
    // console.log(favorites)
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};