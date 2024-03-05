import V from '#/shared/middlewares/field_validator';
import handleToken from '#/shared/middlewares/handleToken';
import type { FastifyPluginAsync } from 'fastify';
import TransactionController from '../controllers/transaction';


export default <FastifyPluginAsync> async function (app): Promise<void> {
    // GET
    app.get('/types', {
        schema: {
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['success', 'data'],
                properties: {
                    success: V.isBoolean(),
                    data: V.isArray({
                        items: V.isObject({
                            required: ['id', 'type'],
                            properties: {
                                id: V.isInteger(),
                                type: V.isString()
                            }
                        })
                    })
                }
            }))
        }
    }, TransactionController.getTransactionTypes)

    app.get('/types/total', {
        schema: {   
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                properties: {
                    success: V.isBoolean(),
                    data: V.isArray({
                        items: V.isObject({
                            required: ['type_id', 'amount'],
                            properties: {
                                type_id: V.isInteger(),
                                amount: V.isDouble()
                            }
                        })
                    })
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, TransactionController.getTransactionTotalsByTypes)

    app.get('/get', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            querystring: V.isObject({
                properties: {
                    page: V.isInteger(),
                    pageSize: V.isInteger(),
                    title: V.isString(),
                    lastMonth: V.isBoolean(),
                    date: V.isDateOnly()
                }
            }),
            response: app.ResponseSchema().PAGINATION(V.isObject({
                properties: {
                    id: V.isInteger({min: 0}),
                    use_id: V.isInteger({min: 0}),
                    date: V.isDateTime(),
                    title: V.isString({min: 1}),
                    description: V.isString({min: 1}),
                    amount: V.isDouble(),
                    type_id: V.isInteger({min: 0}),
                    category_id: V.isInteger({min: 0}),
                    createdAt: V.isDateOnly(),
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, TransactionController.getTransanctions)

    app.get('/get/type/:typeId', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            params: V.isObject({
                required: ['typeId'],
                properties: {
                    typeId: V.isInteger()
                }
            }),
            querystring: V.isObject({
                properties: {
                    page: V.isInteger(),
                    pageSize: V.isInteger(),
                    title: V.isString(),
                    lastMonth: V.isBoolean(),
                    date: V.isDateOnly()
                }
            }),
            response: app.ResponseSchema().PAGINATION(V.isObject({
                properties: {
                    id: V.isInteger({min: 0}),
                    use_id: V.isInteger({min: 0}),
                    date: V.isDateTime(),
                    title: V.isString({min: 1}),
                    description: V.isString({min: 1}),
                    amount: V.isDouble(),
                    type_id: V.isInteger({min: 0}),
                    category_id: V.isInteger({min: 0}),
                    createdAt: V.isDateOnly(),
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, TransactionController.getTransactionsByType)

    app.get('/get/category/:categoryId', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            params: V.isObject({
                required: ['categoryId'],
                properties: {
                    categoryId: V.isInteger()
                }
            }),
            querystring: V.isObject({
                properties: {
                    page: V.isInteger(),
                    pageSize: V.isInteger(),
                    title: V.isString(),
                    lastMonth: V.isBoolean(),
                    date: V.isDateOnly()
                }
            }),
            response: app.ResponseSchema().PAGINATION(V.isObject({
                properties: {
                    id: V.isInteger({min: 0}),
                    use_id: V.isInteger({min: 0}),
                    date: V.isDateTime(),
                    title: V.isString({min: 1}),
                    description: V.isString({min: 1}),
                    amount: V.isDouble(),
                    type_id: V.isInteger({min: 0}),
                    category_id: V.isInteger({min: 0}),
                    createdAt: V.isDateOnly(),
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, TransactionController.getTransactionsByCategory)

    // POST
    app.post('/create', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            body: V.isObject({
                required: [],
                properties: {
                    date: V.isDateTime(),
                    title: V.isString(),
                    description: V.isString(),
                    amount: V.isDouble(),
                    type_id: V.isInteger(),
                    category_id: V.isInteger(),
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['success', 'id', 'message', 'token'],
                properties: {
                    success: V.isBoolean(),
                    id: V.isInteger(),
                    message: V.isString(),
                    token: V.isString()
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, TransactionController.createTransaction)
}