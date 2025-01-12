import { User } from "../models/user.js";
import { NodeError } from "../utils/NodeError.js";
import { TryCatch } from "../utils/trycatch.js";
import jwt from "jsonwebtoken";

export const restrictToLoggedInUserOnly = TryCatch(async (req,res,next) => {


    const {token} = req.cookies;

    if(!token){
        return next(new NodeError("Please Login First to access this path!", 401));
    }

    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET!)

    // req.user = await User.findById(decodedUserId);

    next();


})