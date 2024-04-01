import type { FastifyPluginAsync } from 'fastify';
import V from '#/shared/middlewares/field_validator';
import handleToken from '#/shared/middlewares/handleToken';
import emailController from '../controllers/emailSender';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    // POST
    app.post('/send', {
        schema: {
            body: V.isObject({
                required: ['to', 'title', 'body'],
                properties: {
                    to: V.isString(),
                    title: V.isString(),
                    body: V.isString()
                }
            }),
            response: app.ResponseSchema().HTTP200(V.isObject({
                required: ['message'],
                properties: {
                    message: V.isString()
                }
            })),
        },
        preHandler: [handleToken.decodeToken()]
    }, emailController.sendEmail)
}