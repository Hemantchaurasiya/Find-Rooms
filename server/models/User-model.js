const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email:{ type:String,required:true,unique:true,trim:true},
        password:{type:String,required:true,min:6,max:20,trim:true},
        isVerified:{ type:Boolean,default:false},
        isAdmin:{ type:Boolean,default:false},
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);