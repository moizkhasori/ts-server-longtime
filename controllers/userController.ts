import { nanoid } from "nanoid";
import errorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/user.js";
import { NodeError } from "../utils/NodeError.js";
import { TryCatch } from "../utils/trycatch.js";
import {hash} from "bcrypt";
import { generateRandomCode } from "../utils/radomCode.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendEmail.js";




export const handleSignupUser = TryCatch(async(req,res,next) => {

    const {email, password} = req.body;

    if(!email || !password){
        return next(new NodeError("Both Email and Password are required to create an account!"));
    }

    let user = await User.findOne({email});

    if(user){
        return next(new NodeError("An account with this email already exits, please login!",400));
    }

    const hashedPassword = await hash(password,10);
    const verificationCode = generateRandomCode(6);
    const ttlVerificationCode = new Date(Date.now() + 15 * 60 * 1000);

    user = await User.create({
        email,
        password: hashedPassword,
        verificationCode,
        ttlVerificationCode
    })

    await sendVerificationEmail(email,verificationCode);
    const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET!);    
    
    res.status(201).cookie("token",jwtToken).json({
        success: true,
        message: "user created successfully - check email for verification!",
        user
    })
}) 


export const handleVerifyEmail = TryCatch(async (req,res,next) => {
    
})

export const handleTest = TryCatch(async (req,res) => {
    
    res.send({
        success: true
    })
})