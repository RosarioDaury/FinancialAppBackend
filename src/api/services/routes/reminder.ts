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
                required: ['page', 'pageSize'],
                properties: {
                    page: V.isInteger(),
                    pageSize: V.isInteger(),
                    title: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: [],
                properties: {

                }   
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, reminderControllers.getReminders)

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
    app.put('/update', {
        schema: {
            headers: V.isObject({
                required: ['token'],
                properties: {
                    token: V.isString()
                }
            }),
            body: V.isObject({
                properties: {
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