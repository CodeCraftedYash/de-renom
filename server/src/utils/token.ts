import jwt, { JwtPayload } from "jsonwebtoken"
import { env } from "../modules/auth/auth.env.js"

export const signAccessToken = (payload:JwtPayload) =>{
    return jwt.sign(
        payload,
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: `${env.ACCESS_TOKEN_EXPIRES}m`}
    )
}
export const signRefreshToken = (payload: object) => {
  return jwt.sign(
    payload,
    env.REFRESH_TOKEN_SECRET!,
    { expiresIn: `${env.REFRESH_TOKEN_EXPIRES}d` }
  );
};