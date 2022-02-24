const mongoose = require('mongoose');
const config = require('../config/auth.config');
const {v4 : uuidv4} = require('uuid');

const tokenSchema = new mongoose.Schema({
    token:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    expirationDate:Date,
});

tokenSchema.statics.createToken = async function(user){
    let expiryDate = new Date();
    expiryDate.setSeconds(
        expiryDate.getSeconds() + config.refreshTokenLife
    );
    let tokenString= uuidv4();
    let _object = new this({
        token:tokenString,
        user:user._id,
        expirationDate:expiryDate.getTime()
    });
    let refreshToken = await _object.save();
    return refreshToken.token;
};

tokenSchema.statics.isExpired = (token) =>{
    return token.expirationDate.getTime() < new Date().getTime();
}

const refreshToken = mongoose.model("RefreshToken", tokenSchema);

module.exports = refreshToken;