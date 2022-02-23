const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model")
const auth =  require("../config/auth.config");

exports.signUp = async (req, res) =>{
    try{
    const user = new User({
        username: req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
    });
    await user.save();
    res.status(201).send({
        message: "User Registered Successfully"
    });
    }catch(err){
        res.status(500).send(err);

    }
}

exports.signIn = async(req,res) =>{
    try{
       const user = await User.findOne({username:req.body.username});
       const isValidPassword =bcrypt.compareSync(req.body.password,
         user.password)

       if(!isValidPassword){
           return res.status(401).send({
               message:"Invalid password"
           });
       }

       let token = jwt.sign({id: user.id}, auth.secret, 
        {
            expiresIn: 43200
        })

        res.status(200).send({
            user:{
                id:user._id,
                username:user.username,
                email: user.email,
            },
            message: "Login Successfull",
            accessToken: token,
        });
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }

}