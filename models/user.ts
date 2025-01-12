import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type:String, 
        required:[true, "email cannot be empty!"],
        unique: [true, "Account with this emaill already exist! Please Login"],
    },
    password: {
        type: String, 
        required: [true, "password cannot be empty!"],
        minlength : [8, "password must be larger than 8 characters!"],
        select: false,
    },
    verificationCode: {
        type: String,
        required: [true, "verification code is required!"]
    },
    ttlVerificationCode: {
        type: Date,
        required: [true, "verification code expiry time is required!"]
    },
    isVerified:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema);

export {User};