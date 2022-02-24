const mongoose=require("mongoose");
require('mongoose-type-email');
require("../config/db.config");

const userSchema = new mongoose.Schema({
            username: { 
                type: String,
                required:[true, "username not provided"]
            },
            email: {
                type: mongoose.SchemaTypes.Email,
                required:[true, "email not provided"],

            }, 
            password:{ 
                type: String,
                required:true,
            }
        });

const user = new mongoose.model("User", userSchema);

module.exports= user;