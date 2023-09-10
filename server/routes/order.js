const express = require('express');
const router = express.Router();
const {requireSignIn} = require('../middleware/authMiddleware')
const orderController = require('../controllers/orderController');

router.post('/add-to-order', requireSignIn, orderController.addToOrder);
router.get('/get-user-orders', requireSignIn, orderController.getUserOrders);

module.exports = router;