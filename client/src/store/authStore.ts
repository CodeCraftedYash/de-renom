import { create } from "zustand";

type User = {
    id: string;
    username: string;
    role: string;
}

type AuthState = {
    user:User | null,
    accessToken: string | null;
    setAuth: (user:User,token:string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    setAuth: (user:User, token:string) => set({user,accessToken:token}),
    logout: () => set({
        user:null, accessToken: null
    })
}))