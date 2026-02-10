import { z } from 'zod'

export const signupSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8)
})

export const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8)
})

export type signupInput = z.infer<typeof signupSchema>;
export type loginInput = z.infer<typeof loginSchema>;