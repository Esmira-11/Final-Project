const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createPetCategory, updatePetCategory, getAllPetCategory, getPetCategoryById, getPetCategoryPhoto, deletePetCategoryById} = require('../controllers/petcategory');

const router = express.Router();
router.route("/create-petcategory").post(requireSignIn, isAdmin,formidable(), createPetCategory);
router.route("/update-petcategory/:id").put(requireSignIn, isAdmin, formidable(), updatePetCategory);
router.route("/all-petcategories").get(getAllPetCategory);
router.route("/get-petcategory/:id").get(getPetCategoryById);
router.route("/delete-petcategory/:id").delete(deletePetCategoryById);

//get-photo
router.route("/petcategory-photo/:id").get(getPetCategoryPhoto);


module.exports = router;
