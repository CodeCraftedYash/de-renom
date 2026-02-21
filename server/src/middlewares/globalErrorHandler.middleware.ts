import { Request,Response,NextFunction } from "express";
import { appError } from "../utils/appError";

export const globalErrorHandler = (req:Request,res:Response,next:NextFunction,err:any) => {
    if(err instanceof appError){
        return res.status(err.statusCode).json({message:err.message});
    }
    return res.status(500).json({message:"Internal Server Error"})
}