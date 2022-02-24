const jwt = require("jsonwebtoken"),
RefreshToken = require("../models/refreshToken.model"),
config=  require("../config/auth.config");

const refreshToken = async(req, res) =>{
    const token = req.body.refreshToken;
    if(token == null){
        res.status(403).send({
            message:"Refresh token is not provided!"
        });
        return;
    }
    
    try{
       let refreshToken = await RefreshToken.findOne({token:token});
       if(!refreshToken){
           res.status(403).send({
               message:"Refresh token is not valid"
           })
            return;
       }

       if(RefreshToken.isExpired(refreshToken)){
           await RefreshToken.findByIdAndDelete(refreshToken._id);
           res.status(403).send({
               message:"Refresh token is expired! Kindly, Login again."
           })
           return;
       }

       let newToken = jwt.sign({id: refreshToken.user._id}, config.secret, 
        {
            expiresIn:config.tokenLife
        });

        res.status(200).send({
            accessToken:newToken,
            refreshToken:refreshToken.token
        });

    }catch(err){

        res.status(500).send(err)
        console.log(err);
    }
}

module.exports = refreshToken;