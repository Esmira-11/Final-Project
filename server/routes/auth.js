const express = require('express');
const router = express.Router();
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware") 
const { test,register, forgotpassword, resetpassword, login, verifyEmail} = require('../controllers/auth')

router.route("/register").post(register);

router.route("/verify").post(verifyEmail);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/test").get(requireSignIn,isAdmin,test);

//protected User route auth
router.route("/user-auth").get(requireSignIn, (req,res) => {
    res.status(200).send({ ok: true });
} );

//protected Admin route auth
router.route("/admin-auth").get(requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ ok: true });
} );


module.exports = router;