import type { User } from "./user";

export type AuthState = {
    user:User | null,
    accessToken: string | null;
    setAuth: (user:User,token:string) => void;
    logout: () => void;
}

export type loginResponse = {
    accessToken: string;
    user: User;
    message: string;
}