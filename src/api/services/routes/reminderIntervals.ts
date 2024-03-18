import V from "#/shared/middlewares/field_validator";
import type { FastifyPluginAsync } from 'fastify';
import intervalControllers from '#/services/controllers/reminderIntervals';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    // GET
    app.get('/get',
    {
        schema: {
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['success', 'data'],
                properties: {
                    success: V.isBoolean(),
                    data: V.isArray({
                        items: V.isObject({
                            properties: {
                                id: V.isInteger(),
                                title: V.isString(),
                                interval: V.isInteger()
                            }
                        })
                    })
                }
            }))
        }
    }, intervalControllers.getReminderIntervals)

    // // DELETE
    // app.delete('/delete/:id', {
    //     schema: {
    //         params: V.isObject({
    //             required: ['id'],
    //             properties: {
    //                 id: V.isInteger()
    //             }
    //         }),
    //         response: app.ResponseSchema().HTTP200(V.isObject({
    //             required: ['success', 'message'],
    //             properties: {
    //                 success: V.isBoolean(),
    //                 id: V.isInteger(),
    //                 message: V.isString(),
    //             }
    //         }))
    //     }
    // }, intervalControllers.removeReminderIntervals)
}    