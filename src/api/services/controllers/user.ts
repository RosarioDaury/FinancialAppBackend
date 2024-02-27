import Users from "#/models/users";
import UserType from "#/models/userTypes";
import { comparePassword, encryptPassword } from "#/shared/helpers/encryptPasswords";
import { encryptUserJwt } from "#/shared/helpers/jwtHandler";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";
import { RouteHandler } from "fastify";
import { UsersCreationAttributes } from "#/models/users/model";

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
    type_id: number,
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
            type_id,
            balance
        } = req.body;

        const user = await Users.get.byCredentials({ username, email })

        if(user) {
            return res.res4xx({
                httpCode: 400,
                error: "Username already used"
            })
        }
        
        let pass = await encryptPassword(password);

        await Users.create({
            firstName,
            lastName,
            username,
            password: pass,
            email,
            type_id,
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

        const user = await Users.get.byCredentials({username});

        if(!user){
            return res.res500({
                error: "Username or Password incorrect"
            })
        }

        let pass = await comparePassword(password, user.password);

        if(!pass){
            return res.res500({
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

const updateUser: TokenRequestHandler<{Body: UsersCreationAttributes}> = async (req, res) => {
    try {
        const {user} = req.headers;
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            type_id,
            balance,
            active,
        } = req.body;

        await Users.update({id: user.id, updated: {
            firstName,
            lastName,
            username,
            password,
            email,
            type_id,
            balance,
            active,
        }})

        const userUpdated = await Users.get.byCredentials({username: username});
        const token = await encryptUserJwt(userUpdated!);

        res.res200({
            message: 'User Updated',
            id: user.id,
            token
        })

    } catch(error) {
        res.registerError({
            title: "Update User Error",
            code: 'u-5',
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
    getUserTypes,
    updateUser
}