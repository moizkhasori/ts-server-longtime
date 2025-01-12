import {Request, Response, NextFunction, RequestHandler} from "express"

export const TryCatch = (givenFn: RequestHandler):RequestHandler => {
    return (req:Request ,res:Response ,next:NextFunction) => {
        Promise.resolve(givenFn(req,res,next)).catch(next);
    }
}