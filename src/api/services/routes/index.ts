import type { FastifyPluginAsync } from 'fastify';
import userRoutes from './user';
import categoryRoutes from './category';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    await app.register(userRoutes, {
        prefix: '/user'
    })

    await app.register(categoryRoutes, {
        prefix: '/category'
    })
}   