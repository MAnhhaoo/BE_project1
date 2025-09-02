const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name: {type: String , require: true},
        email : {type: String , require: true , unique : true},
        password: {type: String , require: true},
        isAdmin : {type: Boolean , default : false, require: true},
        phone : {type: Number , require: true},
        address: {type : String , require: true},
        avatar : {type: String},
        access_token : {type: String , require: true},
        refresh_token : {type: String , require: true},
    } , 
    {
        timestamps : true 
    }
) ;
const User = mongoose.model("User" , UserSchema);
module.exports = User;