import * as jwt from 'jsonwebtoken'
import { config } from "#/config/envConfig";
import { UsersAttributes } from '#/models/users/model';

const encryptUserJwt = async (User: UsersAttributes) => {
    const token = await jwt.sign(User, config.SECRETKEY_ACCESS_TOKEN, { expiresIn: '1d' });
    return token
}

export {
    encryptUserJwt
}