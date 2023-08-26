const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn} = require('../middleware/authMiddleware');
const { createQuestion, createAnnouncement } = require('../controllers/announcement');

const router = express.Router();

router.route("/create-question").post(requireSignIn,  createQuestion);
router.route("/create-announcement").post(requireSignIn,formidable(),  createAnnouncement);

module.exports = router;