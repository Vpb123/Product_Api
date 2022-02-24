const jwt = require("jsonwebtoken"),
config=require("../config/auth.config");
User = require("../models/user.model");


const{ TokenExpiredError} =jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError){
        return res.status(401).send({ message:"The Token has expired."});
    }
    return res.status(401).send({message:err.message});
}

const verifyToken = (req, res, next)=>{
    if(req.headers && req.headers.authorization && 
    req.headers.authorization.split(' ')[0] ==='JWT'){
    
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, config.secret, (err, decode)=>{
          if(err) {
          return catchError(err, res);
          }
          User.findOne({
              _id:decode.id
          }).exec((err, user) =>{
              if(err){
                  res.status(500).send("User undefined");
                  console.log(err);
              }
              else{
                  next();
              }
          });

        }); 
    }else{
        res.status(401).send("Access token is not provided");
        return;
    }
};

module.exports = verifyToken;