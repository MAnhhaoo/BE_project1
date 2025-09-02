const { request } = require('express');
const mongoose = require('mongoose');
const OderSchema = new mongoose.Schema({

    orderItems : [{
        name : {type : String , require: true},
        amount : {type : Number , require: true},
        image : {type : String , require: true},
        price : {type : Number , require: true},
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true ,
        },
    },
],

    shippingAdress : {
         fullName : {type : String , require: true},
        adress : {type : String , require: true},
        city : {type : String , require: true},
        country : {type : String , require: true},
        phone : {type : Number , require: true},

    }   ,

    paymentMethod : {type : String , require : true},
    itemsPrice : {type : String , require: true},
    shippingPrice : {type: Number , require : true},
    taxPrice : {type: Number , require : true},
    totalPrice : {type : Number , require: true},
    user : {type: mongoose.Schema.Types.ObjectId,ref:'User', require: true},
    isPaid : {type : Boolean , default: false},
    paidAt: {type: Date},
    isDelivered : {type : Boolean , default : false} ,
    deliveredAt : {type : Date},



 



},
 {
    timestamps : true
 }
) ;
const Oder = mongoose.model("Oder" , OderSchema);
module.exports = Oder;