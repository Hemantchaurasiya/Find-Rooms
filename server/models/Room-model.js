const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        owner:{ type:String,required:true,trim:true},

        email:{ type:String,required:true,trim:true},

        mobile:{type:String,max:12,min:10,default:"",trim:true},

        price:{type:Number},

        desc:{type:String,default:"",trim:true},

        facilities:{type:String,default:"",trim:true},

        photo:{type:String,default:""},

        place:{type:String,max:500,default:"",trim:true},

        city:{type:String,max:50,default:"",trim:true},

        state:{type:String,max:50,default:"",trim:true},
        
        country:{type:String,max:50,default:"",trim:true},
    },
    {timestamps:true}
);

module.exports = mongoose.model("Room",RoomSchema);