import { NextFunction, Response, Request } from "express";
import { Role } from "../types/authorizeRolesType";

export const authorize = (...allowedRoles:Role[]) => ( req:Request,res:Response,next:NextFunction ) => {
 if(!req.user){
    return res.status(401).json({message:"Unauthorized"});
 }

 if(!allowedRoles.includes(req.user.role as Role)){
     return res.status(403).json({message:"Forbidden"});
 }

 next();
 
}
