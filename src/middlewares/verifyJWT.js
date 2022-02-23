const jwt = require("jsonwebtoken"),
config=require("../config/auth.config");
User = require("../models/user.model");

const verifyToken = (req, res, next)=>{
    if(req.headers && req.headers.authorization && 
    req.headers.authorization.split(' ')[0] ==='JWT'){
    
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, config.secret, (err, decode)=>{
          if(err) {
          res.status(500).send(err)
          return;
          }
          User.findOne({
              _id:decode.id
          }).exec((err, user) =>{
              if(err){
                  res.status(500).send("User undefined");
                  console.log(err);
              }
              else{
                  req.user=user;
                  next();
              }
          });

        }); 
    }else{
        res.status(400).send("Access token is not provided");
        return;
    }
};

module.exports = verifyToken;