import { compareSync, genSaltSync, hashSync } from "bcrypt";

/**
 * 
 * @param password 
 */
export const encryptPassword = async (password: string): Promise<string> => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return hash
}

/**
 * 
 * @param password 
 * @param encrypted 
 * @returns Promise<boolean>
 */
export const comparePassword = async (password: string, encrypted: string): Promise<boolean> => {
    return compareSync(password, encrypted);
}


