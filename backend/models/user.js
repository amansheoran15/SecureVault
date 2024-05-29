const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is a required field"],
        minLength:[4, "Name must be of 4 characters minimum"]
    },
    profile_img:{
        public_id: String,
        url: String
    },
    email:{
        type:String,
        required:[true, "Email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[8, "Password must be at least 8 characters minimum"],
        select: false
    }
})

module.exports = mongoose.model("User", userSchema);