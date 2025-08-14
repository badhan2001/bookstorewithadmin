const mongoose = require("mongoose");

const user= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    email: {
        type:String,
        required:true,
        unique:true,
        match: /.+\@.+\..+/
    },
    password:{
        type:String,
        required:true,
        minlength:6
        // unique:true,
    },
    address: {
        type:String,
        required:true,
        // unique:true,
    },
    avatar: {
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        // unique:true,
    },
    role: {
        type:String,
        default: "user",
        enum: ["user","admin"],
    },
    favourites: [
        {
            type:mongoose.Types.ObjectId,
            ref: "Book", 
    },
],
cart: [
    {
        type: mongoose.Types.ObjectId,
        ref: "Book",
    },
],
orders: [
    {
        type: mongoose.Types.ObjectId,
        ref: "Order",
    },
],
},
{timestamps:true}
);
module.exports=mongoose.model("User",user);