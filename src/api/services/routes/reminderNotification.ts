import V from "#/shared/middlewares/field_validator";
import handleToken from "#/shared/middlewares/handleToken";
import type { FastifyPluginAsync } from 'fastify';
import reminderNotificationsControllers from '#/services/controllers/reminderNotification';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    //GET
    app.get('/get/:reminderId', {
        schema: {
            params: V.isObject({
                properties: {
                    reminderId: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                properties: {
                    data: V.isObject({
                        properties: {
                            id: V.isInteger(),
                            externalId: V.isString(),
                            reminderId: V.isInteger(),
                            createdAt: V.isDateTime(),
                            updatedAt: V.isDateTime()
                        }
                    })
                    
                }
            }))
        }
    }, reminderNotificationsControllers.getReminderNotificationById)

    // POST
    app.post('/create', {
        schema: {
            body: V.isObject({
                required: ['externalId', 'reminderId'],
                properties: {
                    externalId: V.isString(),
                    reminderId: V.isInteger()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    id: V.isString(),
                    message: V.isString()
                }
            }))
        }
    }, reminderNotificationsControllers.createRemindeNotification)

    // PUT  
    app.put('/update', {
        schema: {
            body: V.isObject({
                required: ['currentId', 'newId'],
                properties: {
                    currentId: V.isString(),
                    newId: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    id: V.isString(),
                    message: V.isString()
                }
            }))
        }
    }, reminderNotificationsControllers.updateReminderNotification)

    // DEL
    app.delete('/delete/:id', {
        schema: {
            params: V.isObject({
                properties: {
                    id: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    id: V.isString(),
                    message: V.isString()
                }
            }))
        }
    }, reminderNotificationsControllers.removeReminderNotification)

}