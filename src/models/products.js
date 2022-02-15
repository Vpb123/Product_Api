const mongoose=require("mongoose");


const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    _id:Number,
    name:{ 
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true, 
    },
    available:{
        type:Boolean,
        default:false,
    }
})
productSchema.plugin(AutoIncrement);

const product = new mongoose.model("Product", productSchema);

module.exports = product;