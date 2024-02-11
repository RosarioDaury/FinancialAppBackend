import User from "#/models/user";
import UserType from "#/models/userTypes";
import { comparePassword, encryptPassword } from "#/shared/helpers/encryptPasswords";
import { encryptUserJwt } from "#/shared/helpers/jwtHandler";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";
import { RouteHandler } from "fastify";

const getByCredentials: TokenRequestHandler<{}> = async (req, res) => {
    try {

        const {user} = req.headers; 
        return res.res200({
            data: user
        })
    } catch(error) {
        res.registerError({
            title: "Get User By Credentials Error",
            code: 'u-1',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }   
}

type CreateUserBody = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    userType: number,
    balance: number
}

const createUser: RouteHandler<{Body: CreateUserBody}> = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            userType,
            balance
        } = req.body;

        const user = await User.get.byCredentials({ username, email })

        if(user) {
            return res.res4xx({
                httpCode: 400,
                error: "Username already used"
            })
        }
        
        let pass = await encryptPassword(password);

        await User.create({
            firstName,
            lastName,
            username,
            password: pass,
            email,
            userType,
            balance
        })


        return res.res200({
            message: 'New User Created'
        })

    } catch(error) {
        res.registerError({
            title: "Get User By Credentials Error",
            code: 'u-2',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const authUser: RouteHandler<{Body: {username: string, password: string}}> = async (req, res) => {
    try{

        const {
            username,
            password
        } = req.body

        const user = await User.get.byCredentials({username});

        if(!user){
            return res.res4xx({
                httpCode: 401,
                error: "Username or Password incorrect"
            })
        }

        let pass = await comparePassword(password, user.password);

        if(!pass){
            return res.res4xx({
                httpCode: 401,
                error: "Username or Password incorrect"
            })
        }
        let userToken = await encryptUserJwt(user);
        return res.res200({
            data: userToken
        })


    } catch(error) {
        res.registerError({
            title: "Auth User Error",
            code: 'u-3',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const getUserTypes: RouteHandler =  async (req, res) => {
    try {
        let userTypes = UserType.getAll();
        return res.res200({
            data: userTypes
        })
    } catch(error) {
        res.registerError({
            title: "Get User Types Error",
            code: 'u-4',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }  
}

export default {
    getByCredentials,
    createUser,
    authUser,
    getUserTypes
}