const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TokenSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }

});

TokenSchema.pre("save", async function(next){
    if(!this.isModified("token")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt)
    next();
});

TokenSchema.methods.compareToken = async function (token){
    return await bcrypt.compare(token, this.token);
}

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;