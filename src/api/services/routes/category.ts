import type { FastifyPluginAsync } from 'fastify';
import categoryController from '../controllers/category';
import V from '#/shared/middlewares/field_validator';
import handleToken from '#/shared/middlewares/handleToken';

export default <FastifyPluginAsync> async function (app): Promise<void> {
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
                    pageSize: V.isInteger()
                }
            }),
            params: V.isObject({
                properties: {
                    id: V.isInteger()
                }
            }),
            response: app.ResponseSchema().PAGINATION(V.isObject({
                properties: {
                    id: V.isInteger({min: 0}),
                    name: V.isString({min: 1}),
                    limit: V.isInteger(),
                    createdAt: V.isDateOnly(),
                    total: V.isInteger()
                }
            }))
        },
        preHandler: [handleToken.decodeToken()]
    }, categoryController.getCategories)


    app.post('/create', {
        schema: {
            body: V.isObject({
                required: ['name', 'limit'],
                properties: {
                    name: V.isString(),
                    limit: V.isInteger(),
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
    }, categoryController.create)
}