import { prisma } from "../../db/prisma";
import { signRefreshToken } from "../../utils/token";
import { hashPassword } from "../../utils/hash";

export const createSession = async (userId:string)=>{    
    const expireAt = new Date();
    expireAt.setDate(
    expireAt.getDate() + Number(process.env.REFRESH_TOKEN_EXPIRES)
  );

   const session = await prisma.session.create({
    data: {
        userId,
        refreshTokenHash: "",
        expireAt, 
        createdAt: new Date()
    }
  });
    const refreshToken = signRefreshToken({sub:userId,session_id:session.id});
    const refreshTokenHash = await hashPassword(refreshToken);
    await prisma.session.update({
      where: { id:session.id},
      data: { refreshTokenHash}
    })
    
   return {
    refreshToken,
    sessionId: session.id,
  };
}



 

