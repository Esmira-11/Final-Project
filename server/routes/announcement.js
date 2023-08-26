const express = require('express');
const { requireSignIn} = require('../middleware/authMiddleware');
const { createQuestion } = require('../controllers/announcement');

const router = express.Router();

router.route("/create-question").post(requireSignIn,  createQuestion);


module.exports = router;