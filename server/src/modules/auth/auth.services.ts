import { prisma } from "../../db/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signupInput,loginInput } from "./auth.schema.js";
import { signAccessToken } from "../../utils/token.js";
import { createSession } from "./auth.session.service.js";



export const signupService = async (data:signupInput) => {

    const existingUser =  await prisma.user.findFirst({
        where: {
           OR: [
            {email: data.email},
            {username: data.username}
           ]
        }
    })

    if(existingUser){ 
        throw new Error("Email or username already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
        data: {
            username : data.username,
            email: data.email,
            passwordHash : hashedPassword,
        }
    })
    const { refreshToken } = await createSession(user.id);
    const accessToken = signAccessToken({
        sub: user.id,
        role: user.role
    });
   return {
    user:{
        id:user.id,
        username:user.username,
        role:user.role,
        isActive:user.isActive
    },
    accessToken,
    refreshToken
   }
}   

export const loginService = async (data:loginInput) => {
    const user = await prisma.user.findFirst({
        where: { username : data.username }
    })

    if(!user || !user.isActive){
        throw new Error("Invalid credentials")
    }
    
    const isValid = await comparePassword(
        data.password,
        user.passwordHash
    )
    
    if(!isValid){
        throw new Error("Invalid password")
    }

    const accessToken = signAccessToken({
        sub: user.id,
        role: user.role
    });

    const { refreshToken, sessionId } = await createSession(user.id);

    return {
        accessToken,
        refreshToken,
        sessionId,
        user:{
            id: user.id,
            username: user.username,
            role: user.role
        }
    }
}

export const logoutService = async (sessionId:string) => {
    if(!sessionId){
        throw new Error("Session Id required");
    }

    const session = await prisma.session.findUnique({
        where: { id: sessionId },
    });

    if(!session){
        throw new Error("Session not found");
    }

    if( session.revokeAt ){
        return;
    }

    await prisma.session.update({
        where: { id: sessionId },
        data: {
            revokeAt: new Date(),
        }
    })
}