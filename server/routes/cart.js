const express = require('express');
const router = express.Router();
const {requireSignIn} = require('../middleware/authMiddleware')
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', requireSignIn, cartController.addToCart);
router.delete('/remove-from-cart/:productId', requireSignIn, cartController.removeFromCart);
router.get('/getcart', requireSignIn, cartController.getCart);

module.exports = router;