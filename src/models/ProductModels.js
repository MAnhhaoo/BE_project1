const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        name: {type: String , unique: true ,require: true},
        image : {type: String , require: true , unique : true},
        type: {type: String , require: true},
        price : {type: Number , require: true},
        countInStock : {type: Number , require: true},
        rating : {type: Number , require: true},
        description : {type: String },
    } , 
    {
        timestamps : true 
    }
) ;
const Product = mongoose.model("Product" , ProductSchema);
module.exports = Product;