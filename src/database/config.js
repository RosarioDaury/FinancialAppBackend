const fs = require('node:fs');
const path = require('node:path');


let offset = new Date().getTimezoneOffset() / 60;
const offsetSTR = Math.abs(offset) < 10 ? `0${Math.abs(offset)}` : offset;
const timezone = offsetSTR === 0 ? "+00:00" : offset > 0 ? `-${offsetSTR}:00` : `+${offsetSTR}:00`;


const conOptions = {
  // Development
    DB_DEV_HOST: process.env.DB_DEV_HOST ?? '',
    DB_DEV_PORT: parseInt(process.env.DB_DEV_PORT ?? '0'),
    DB_DEV_NAME: process.env.DB_DEV_NAME ?? '',
    DB_DEV_USER: process.env.DB_DEV_USER ?? '',
    DB_DEV_PASSWORD: process.env.DB_DEV_PASSWORD ?? '',
    DB_DEV_CA_PATH: process.env.DB_DEV_CA_PATH ?? ''
}


const connections = {
    development: {
        dialect: "mysql",
        host: conOptions.DB_DEV_HOST,
        port: conOptions.DB_DEV_PORT,
        database: conOptions.DB_DEV_NAME,
        username: conOptions.DB_DEV_USER,
        password: conOptions.DB_DEV_PASSWORD,
        dialectOptions: {
            timezone,
            ssl: (conOptions.DB_DEV_CA_PATH.length > 0) ? {
                ca: fs.readFileSync(path.resolve(conOptions.DB_DEV_CA_PATH))
            } : undefined
        },
        timezone
    }
}


module.exports = connections[process.env.NODE_ENV];