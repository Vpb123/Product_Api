const jwt = require("jsonwebtoken"),
bcrypt = require("bcryptjs"),
User = require("../models/user.model"),
RefreshToken = require("../models/refreshToken.model"),
auth =  require("../config/auth.config");



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
       const isValidPassword =await bcrypt.compare(req.body.password,
         user.password)

       if(!isValidPassword){
           return res.status(401).send({
               message:"Invalid password"
           });
       }

       let token = jwt.sign({id: user._id}, auth.secret, 
        {
            expiresIn: auth.tokenLife,
        })
        let refreshToken = await RefreshToken.createToken(user);

        res.status(200).send({
            user:{
                id:user._id,
                username:user.username,
                email: user.email,
            },
            message: "Login Successfull",
            accessToken: token,
            refreshToken: refreshToken,
        });
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }

}

