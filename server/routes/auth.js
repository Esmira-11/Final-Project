const express = require('express');
const router = express.Router();

const { register, forgotpassword, resetpassword, login, verifyEmail} = require('../controllers/auth')

router.route("/register").post(register);

router.route("/verify").post(verifyEmail);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;