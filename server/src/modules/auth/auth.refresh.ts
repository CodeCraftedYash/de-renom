import jwt  from "jsonwebtoken";
import { prisma } from "../../db/prisma";
import { comparePassword } from "../../utils/hash";
import { signAccessToken } from "../../utils/token";
import { env } from "./auth.env";
import { createSession } from "./auth.session.service";

export const refreshService = async (refreshToken: string,) =>{

    if(!refreshToken){
        throw new Error("Unauthorized");
    }

    const payload = jwt.verify(
        refreshToken,
        env.REFRESH_TOKEN_SECRET!,
    ) as { sub: string, session_id: string};

    const { sub:user_id, session_id } = payload;

    const session = await prisma.session.findUnique({
        where: { id: session_id },
    });

    const user = await prisma.user.findUnique({
        where: {id: user_id}
    });

    if(!session || !user){
        throw new Error("Unauthorized");
    }

    if(session.expireAt < new Date()){
        await prisma.session.deleteMany({ where: {id: session.id }});
        throw new Error("Session expired");
    }

    const isValid = await comparePassword(
        refreshToken,
        session.refreshTokenHash
    )

    if(!isValid){
        await prisma.session.deleteMany({ where: {id: session.id }});
        throw new Error("Unauthorized");
    }

    await prisma.session.deleteMany({
        where: { id: session.id },
    });

    const { refreshToken:newRefreshToken, sessionId } = await createSession(user_id)

    const accessToken = signAccessToken({
        sub: user_id,
        role: user.role
    })
    return {
        accessToken,
        newRefreshToken,
        sessionId
    }
}