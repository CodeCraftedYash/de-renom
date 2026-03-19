import { Request,Response } from "express";
import { getMeService, loginService, logoutService, signupService } from "./auth.services";
import { cookieOptions } from "../../config/cookie";
import { refreshService } from "./auth.refresh";
import { AuthenticateType } from "../../types/authenticateType";

export const signupController = async (req:Request,res:Response) => {
    const result = await signupService(req.body);
    res.cookie("refreshToken",result.refreshToken,cookieOptions);
    return res.status(201).json({
      user:result.user,
      access:result.accessToken,
      message:"signup successful"
    })
}

export const loginController = async (req:Request,res:Response) => {
      const result = await loginService(req.body);
      res.cookie("refreshToken",result.refreshToken,cookieOptions)
      return res.status(200).json({
        accessToken:result.accessToken,
        user:result.user,
        message:"login successful"
      })
}

export const logoutController = async (req:Request,res:Response) => {
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
}

export const refreshController = async ( req: Request, res: Response ) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const {
      accessToken,
      newRefreshToken,
    } = await refreshService(refreshToken);

    res
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json({
        accessToken,
      });

  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const meController = async (req: AuthenticateType, res: Response) => {
    const userId = req.user!.sub;
    const user = await getMeService(userId);
    res.status(201).json({message:"success",user});
};