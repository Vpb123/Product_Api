const mongoose=require("mongoose");
require('mongoose-type-email');
require("../config/db.config");

const userSchema = new mongoose.Schema({
            username: { 
                type: String,
                required:[true, "username not provided"]
            },
            email: {
                type: String,
                lowercase: true,
                required:[true, "email not provided"],
                validate: {
                    validator: function (v) {
                      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                    },
                    message: '{VALUE} is not a valid email!'
                  }
            }, 
            password:{ 
                type: String,
                required:true,
            }
        });

const user = new mongoose.model("User", userSchema);

module.exports= user;