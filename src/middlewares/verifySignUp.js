const User = require("../models/user.model");

const checkDuplicateUserOrEmail = (req, res, next) =>{

    User.findOne({username:req.body.username}
        ).exec((err, user) =>{
            if(err){
                res.status(500).send({message:err})
                return;
            }
            if(user){
              res.status(400).send({
                    message:"User with this username already exists!"
                });
              return;
            }

    User.findOne(
        {email:req.body.email}
        ).exec((err, user)=>{
            if(err){
                res.status(500).send({message:err})
                return;
            }
            if(user){
              res.status(400).send({
                    message:"User with this email address already exists!"
                });
                return;
            }
          next();

        });
    });
}
module.exports = checkDuplicateUserOrEmail;