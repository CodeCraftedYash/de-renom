import { Request,Response } from "express";
import { loginService, logoutService, signupService } from "./auth.services";
import { cookieOptions } from "../../config/cookie";

export const signupController = async (req:Request,res:Response) => {
  try {
    const result = await signupService(req.body);
    res.cookie("refreshToken",result.refreshToken,cookieOptions);
    return res.status(201).json({
      user:result.user,
      access:result.accessToken,
      message:"signup successful"
    })
  }
  catch(error){
    return res.status(401).json({
    message:"Signup failed"
    })
  }
}

export const loginController = async (req:Request,res:Response) => {
    try{
      const result = await loginService(req.body);
      res.cookie("refreshToken",result.refreshToken,cookieOptions)
      return res.status(200).json({
        accessToken:result.accessToken,
        user:result.user,
        message:"login successful"
      })
    } 
    catch(error){
      return res.status(401).json({
        message:"login failed"
      })
    }
}

export const logoutController = async (req:Request,res:Response) => {
  try {
     const sessionId = req.cookies.sessionId;
     if(!sessionId){
      return res.status(401).json({ message:"not authenticated "});
     } 
     await logoutService(sessionId);
     res.clearCookie("refreshToken",cookieOptions);
     res.clearCookie("session_id",cookieOptions);
        return res.status(200).json({
        message: "Logged out successfully",
    });
  } catch (error) {
     return res.status(500).json({
      message: "Logout failed",
    });
  }

}