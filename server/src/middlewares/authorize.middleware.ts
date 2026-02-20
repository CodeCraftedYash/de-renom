import { NextFunction, Response } from "express";
import { AuthenticateType } from "../types/authenticateType";
import { Role } from "../types/authorizeRolesType";

export const authorize = (...allowedRoles:Role[]) => ( req:AuthenticateType,res:Response,next:NextFunction ) => {
 if(!req.user){
    return res.status(401).json({message:"Unauthorized"});
 }

 if(!allowedRoles.includes(req.user.role as Role)){
     return res.status(401).json({message:"Forbidden"});
 }

 next();
 
}
