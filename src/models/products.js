const mongoose=require("mongoose");

require("../db/connect");


/* Creating the schema for product document */
const productSchema = new mongoose.Schema({
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
});


/*Creating instance using schema i.e. collection named product */
const product = new mongoose.model("Product", productSchema);

module.exports = product;