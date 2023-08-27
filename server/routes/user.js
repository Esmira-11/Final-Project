const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const {  getAllUsers,deleteCategoryById } = require('../controllers/user');

const router = express.Router();

router.route("/all-users").get(requireSignIn, isAdmin, getAllUsers);
router.route("/delete-user/:id").delete(requireSignIn, isAdmin,deleteCategoryById);

module.exports = router;