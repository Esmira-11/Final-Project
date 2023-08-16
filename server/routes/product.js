const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createProduct, getAllProducts, getProductById, getProductPhoto, deleteProductById, updateProduct } = require('../controllers/product');

const router = express.Router();

router.route("/create-product").post(requireSignIn, isAdmin, formidable(),createProduct);
router.route("/update-product/:id").put(requireSignIn, isAdmin, formidable(),updateProduct);
router.route("/all-products").get(getAllProducts);
router.route("/get-product/:id").get(getProductById);
router.route("/delete-product/:id").delete(deleteProductById);

//get-photo
router.route("/product-photo/:id").get(getProductPhoto);


module.exports = router;
