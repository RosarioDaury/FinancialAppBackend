import fs from 'node:fs';
import path from 'node:path';

type ErrorOptions = {
    title?: string,
    code?: string,
    error?: string,
    [key: string]: any
}

export type RegisterErrorType = {
    registerError: typeof registerError
}

export default function registerError ({title, code, error}: ErrorOptions) {
    try{

        fs.mkdirSync(path.resolve('./logs'), {
            recursive: true
        })
    
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth();
        const day = today.getUTCDay();
    
        const errorFilePath = `logs/${year}-${month + 1}-${day}.log`;
    
        let errorData: ErrorOptions = {
            title: title ?? "Internal Server Error",
            code,
            error,
            data: today.getUTCDate()
        }
    
        fs.appendFileSync(errorFilePath, JSON.stringify(errorData) + '\n\n', {
            encoding: 'utf-8',
            flag: 'a'
        })

    } catch (err) {
        console.log('[ERROR] WHILE CREATING ERROR FILE');
    }
}
