import { Request } from "express";
export interface AuthenticateType extends Request {
    user ? : {
        sub : string;
        role: string;
    }
}