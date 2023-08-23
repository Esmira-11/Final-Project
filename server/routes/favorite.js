const express = require('express');
const router = express.Router();
const {requireSignIn} = require('../middleware/authMiddleware')
const favoriteController = require('../controllers/favoriteController');

router.post('/add-to-favorites', requireSignIn, favoriteController.addToFavorites);
router.delete('/remove-from-favorites/:productId', requireSignIn, favoriteController.removeFromFavorites);
router.get('/getfavorites', requireSignIn, favoriteController.getFavorites);

module.exports = router;