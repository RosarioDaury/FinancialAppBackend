import * as jwt from 'jsonwebtoken'
import { config } from "#/config/envConfig";
import { UserAttributes } from '#/models/user/model';

const encryptUserJwt = async (User: UserAttributes) => {
    const token = await jwt.sign(User, config.SECRETKEY_ACCESS_TOKEN, { expiresIn: '1d' });
    return token
}

export {
    encryptUserJwt
}