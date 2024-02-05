import 'dotenv/config';

export const config = {
    PORT: Number(process.env.PORT),
    ENV: String(process.env.NODE_ENV),
    TZ: process.env.TZ,
    PROJECTNAME: process.env.PROJECT_NAME,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    CORS_PRINCIPAL_ORIGIN: process.env.CORS_PRINCIPAL_ORIGIN,
    PUBLIC_FOLDER_PATH: process.env.PUBLIC_FOLDER_PATH,
    SECRETKEY_ACCESS_TOKEN: process.env.SECRETKEY_ACCESS_TOKEN,
    DB_DEV_HOST: process.env.DB_DEV_HOST,
    DB_DEV_PORT: process.env.DB_DEV_PORT,
    DB_DEV_NAME: process.env.DB_DEV_NAME,
    DB_DEV_USER: process.env.DB_DEV_USER,
    DB_DEV_CA_PATH: process.env.DB_DEV_CA_PATH,
}
