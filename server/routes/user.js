const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const {  getAllUsers,deleteCategoryById, uploadPhoto, getAvatar } = require('../controllers/user');

const router = express.Router();

router.route("/all-users").get(requireSignIn, isAdmin, getAllUsers);
router.route("/delete-user/:id").delete(requireSignIn, isAdmin,deleteCategoryById);
router.route("/upload-avatar").post(requireSignIn,formidable(), uploadPhoto);
router.route("/user-avatar/:id").get(getAvatar);


module.exports = router;