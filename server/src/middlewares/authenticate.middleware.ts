//this middleware extracts the meta deta from the header and read its value to verify if the request is authentic 

import { Request,NextFunction,Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../modules/auth/auth.env";

export const authenticate = ( req:Request, res:Response, next:NextFunction) => {

    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer")){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const token = authHeader.split(" ")[1];
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... we select the second part not bearer

    try{
        const decoded = jwt.verify(token,env.ACCESS_TOKEN_SECRET) as {
            id : string,
            role : "USER"|"STAFF"|"ADMIN"
        }
        req.user = decoded ;
        next();
    } catch{
        return res.status(401).json({ message: "Unauthorized" });
    }
}