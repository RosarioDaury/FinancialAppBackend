import V from "#/shared/middlewares/field_validator";
import handleToken from "#/shared/middlewares/handleToken";
import type { FastifyPluginAsync } from 'fastify';
import reminderControllers from '#/services/controllers/reminder';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    // GET
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
                    title: V.isString()
                }
            }),
            response: app.ResponseSchema().PAGINATION(V.isObject({
                properties: {
                    id: V.isInteger(),
                    user_id: V.isInteger(),
                    amount: V.isDouble(),
                    interval_id: V.isInteger(),
                    intervalTitle: V.isString(),
                    date: V.isDateTime(),
                    title: V.isString(),
                    description: V.isString(),
                    externalId: V.isString(),
                    createdAt: V.isDateTime(),
                    updatedAt: V.isDateTime()
                } 
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, reminderControllers.getReminders)

    app.get('/get/:id', {
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
                    title: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['data'],
                properties: {
                    data: V.isObject({
                        properties: {
                            id: V.isInteger(),
                            user_id: V.isInteger(),
                            amount: V.isDouble(),
                            date: V.isDateTime(),
                            title: V.isString(),
                            description: V.isString(),
                            externalId: V.isString(),
                            interval_id: V.isInteger(),
                            intervalTitle: V.isString(),
                            createdAt: V.isDateTime(),
                            updatedAt: V.isDateTime()
                        }
                    })
                } 
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, reminderControllers.getReminderById)

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
                required: ['amount', 'interval_id', 'date', 'title', 'description'],
                properties: {
                    amount: V.isDouble(),
                    interval_id: V.isInteger(),
                    date: V.isDateTime(),
                    title: V.isString({min: 1, max: 50}),
                    description: V.isString({min: 1, max: 150})
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    success: V.isBoolean(),
                    message: V.isString(),
                    id: V.isInteger()
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, reminderControllers.createRemider)

    // PUT
    app.put('/update/:id', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            params: V.isObject({
                required: ['id'],
                properties: {
                    id: V.isInteger()
                }
            }),
            body: V.isObject({
                properties: {
                    date: V.isDateTime(),
                    amount: V.isDouble(),
                    interval_id: V.isInteger(),
                    title: V.isString({min: 1, max: 50}),
                    description: V.isString({min: 1, max: 150})
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    success: V.isBoolean(),
                    message: V.isString(),
                    id: V.isInteger()
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, reminderControllers.updateReminder)

    // DELETE
    app.delete('/delete/:id', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            params: V.isObject({
                required: ['id'],
                properties: {
                    id: V.isInteger()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    success: V.isBoolean(),
                    message: V.isString(),
                    id: V.isInteger()
                }
            }))
        }
    }, reminderControllers.removeReminder)
}