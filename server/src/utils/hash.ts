import * as bcrypt from "bcrypt";

const SALT_Rounds = 10;

export const hashPassword = async (plainPassword: string) => {
    return await bcrypt.hash(plainPassword,SALT_Rounds);
}

export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string 
) => {
    return bcrypt.compare(plainPassword,hashedPassword);
};