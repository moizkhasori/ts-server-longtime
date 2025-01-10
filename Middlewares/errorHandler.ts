import {Request, Response, NextFunction} from "express"

interface CustomError extends Error{
    statusCode: number
}

const errorHandler = ( err: CustomError, req:Request, res:Response, next:NextFunction ):void => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error!";

    res
        .status(err.statusCode)
        .json({
            success: false,
            message: err.message
        });
};

export default errorHandler