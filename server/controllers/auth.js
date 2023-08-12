const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const { generateOTP } = require('../utils/verifyEmail');
const Token = require('../models/Token');
const {isValidObjectId} = require("mongoose")

exports.register = async (req, res, next) =>{
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username, 
            email, 
            password,
        });

        const OTP = generateOTP();
        const token = new Token({
            userID: user._id,
            token: OTP
        })
        await token.save();
        await user.save();

        const message = `
          <h1>Your verification code is: ${OTP}</h1>
          `
        await sendEmail({
            to: user.email,
            subject: "Verify Email Request",
            text: message
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        //400 bad request
        return next(new ErrorResponse("Please provide an email and password",400));
    }

    try {
        const user = await User.findOne({email}).select("+password");

        if(!user){
            //401 unauthorized
            return next(new ErrorResponse("Invalid Credentials",401));
        }

        if(!user.verified){
            return next(new ErrorResponse("Invalid Credentials",401));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials",401));
        }

        sendToken(user, 200, res);


    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

exports.forgotpassword = async (req, res, next) =>{
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return next(new ErrorResponse("Email could not be sent",404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
          <h1>You have requested a password reset</h1>
          <p>Please go to this link to reset your password</p>
          <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
          `

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status(200).json({success:true, data: "Email Sent"});
        } catch (error) {
           user.resetPasswordToken = undefined;
           user.resetPasswordExpire = undefined;
           
           await user.save();

           return next(new ErrorResponse("Email could not be send", 500))
        }
    } catch (error) {
        next(error);

    }
};

exports.resetpassword = async (req, res, next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })

        if(!user){
            //400 bad request
            return next(new ErrorResponse("Invalid Reset Token",400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success:true,
            data:"Password Reset Success"
        })
    } catch (error) {
        next(error);
    }


};

exports.verifyEmail = async(req,res,next) => {
    const {userID,otp} = req.body;
    if(!userID || !otp.trim()) {
        return next(new ErrorResponse("Invalid request, missing parameters!",400));
    }

    if(!isValidObjectId(userID)){
        return next(new ErrorResponse("Invalid userID!",400));
    }

    const user = await User.findById(userID)
    if(!user){
        return next(new ErrorResponse("Sorry, user not found!",400));
    }

    if(user.verified){
        //what
        return next(new ErrorResponse("This account is already verified",200));
    }

    const token = await Token.findOne({userID: user._id})
    if(!token){
        return next(new ErrorResponse("Sorry, user not found!",400));
    }

    //otp.trim olmalidimi??
    const isMatched = await token.compareToken(otp)
    if(!isMatched){
        return next(new ErrorResponse("Please provide a valid token",400));
    }

    user.verified = true;

    await Token.findByIdAndDelete(token._id);
    await user.save();

    const message = `
          <h1>Your Email Verified Successfully.</h1>
          `
    await sendEmail({
            to: user.email,
            subject: "Verify your email account",
            text: message
    });

    res.status(200).json({
        success:true,
        data:`Your email is verified successfully.`
    })
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true, token})
}
