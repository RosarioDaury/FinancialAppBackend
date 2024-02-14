import type { FastifyPluginAsync } from 'fastify';
import userController from '../controllers/user';
import V from '#/shared/middlewares/field_validator';
import handleToken from '#/shared/middlewares/handleToken';

export default <FastifyPluginAsync> async function (app): Promise<void> {

    app.get('/get', {
        schema: {
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['success', 'data'],
                properties: {
                    data: V.isObject({
                        properties: {
                            id: V.isInteger(),
                            firstName: V.isString(),
                            lastName: V.isString(),
                            email: V.isEmail(),
                            username: V.isString(),
                            password: V.isString(),
                            active: V.isBoolean(),
                            balance: V.isDouble(),
                            type: V.isObject({
                                properties: {
                                    id: V.isInteger(),
                                    type: V.isString()
                                }
                            }),
                            iat: V.isInteger(),
                            exp: V.isInteger()
                        }
                    })
                }
            }))
        },
        preHandler: [ handleToken.decodeToken() ]
    }, userController.getByCredentials)


    app.get('/get/types', {
        schema: {
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['success', 'data'],
                properties: {
                    data: V.isArray({
                        items: V.isObject({
                            properties: {
                                id: V.isInteger(),
                                type: V.isString()
                            }
                        })
                    })
                }
            }))
        }
    }, userController.getUserTypes)


    app.post('/create', {
        schema: {
            body: V.isObject({
                required: ['firstName', 'lastName', 'password', 'email', 'type_id', 'balance'],
                properties: {
                    firstName: V.isString({min: 1, max: 50}),
                    lastName: V.isString({min: 1, max: 50}),
                    username: V.isString({min: 1, max: 50}),
                    password: V.isString({min: 1, max: 50}),
                    email: V.isEmail({min: 1, max: 50}),
                    type_id: V.isInteger(),
                    balance: V.isDouble()
                },
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['success', 'message'],
                properties: {
                    success: V.isBoolean(),
                    message: V.isString()
                }
            }))
        }
    }, userController.createUser)


    app.post('/auth', {
        schema: {
            body: V.isObject({
                required: ['username', 'password'],
                properties: {
                    username: V.isString({min: 1, max: 50}),
                    password: V.isString({min: 1, max: 50})
                },
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['successs', 'data'],
                properties: {
                    success: V.isBoolean(),
                    data: V.isString()
                }
            }))
        }
    }, userController.authUser)
}
