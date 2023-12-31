const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default: Date.now
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;