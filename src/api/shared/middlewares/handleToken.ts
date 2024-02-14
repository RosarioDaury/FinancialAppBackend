import { FastifyReply, FastifyRequest } from "fastify";
import { WithTokenRequest } from "../interfaces/tokenRequestHandler";
import * as jwt from 'jsonwebtoken'
import { config } from "#/config/envConfig";
import { UserJwtPayload } from "jsonwebtoken";

const decodeToken = () => {
    return async function(req: WithTokenRequest<{}>, res: FastifyReply ) {

        try{
            const { token } = req.headers; 
            if(!token){
                throw new Error('Invalid Token Provided')
            }

            let decoded = await <UserJwtPayload>jwt.verify(token, config.SECRETKEY_ACCESS_TOKEN);
            req.headers.user = decoded;
            
        } catch(error) {
            res.registerError({
                title: "Token decoding Error",
                code: 'tck-1',
                error: String(error)
            })

            return res.res4xx({
                httpCode: 403,
                error: String(error)
            })
        }
    }
}



export default {
    decodeToken,
}