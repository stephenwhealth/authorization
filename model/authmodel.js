const mongoose = require('mongoose')

const authentication = new mongoose.Schema({
    Username:{
        type:String,
        required:[true, "username is required"],
        unique: true
    },
    Email:{
        type:String,
        required:[true, "Email is required"],
        unique: true
    },
    Password:{
        type:String,
        required:[true, "Password is required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    Token:{
        type:String
    },
},{timestamps:true})

const newauthentication =mongoose.model("classauthentication", authentication)

module.exports= newauthentication
