const express = require('express');
const router = express.Router();
const {requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const orderController = require('../controllers/orderController');

router.post('/add-to-order', requireSignIn, orderController.addToOrder);
router.get('/get-user-orders', requireSignIn, orderController.getUserOrders);
router.get('/get-all-orders', requireSignIn,isAdmin, orderController.getAllOrders);


module.exports = router;