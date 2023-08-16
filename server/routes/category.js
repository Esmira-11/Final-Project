const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createCategory, updateCategory, getAllCategory, getCategoryById, deleteCategoryById } = require('../controllers/category');

const router = express.Router();

router.route("/create-category").post(requireSignIn, isAdmin, createCategory);
router.route("/update-category/:id").put(requireSignIn, isAdmin, updateCategory);
router.route("/all-categories").get(getAllCategory);
router.route("/get-category/:id").get(getCategoryById);
router.route("/delete-category/:id").delete(requireSignIn, isAdmin, deleteCategoryById);


module.exports = router;
