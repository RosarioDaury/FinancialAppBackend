import type { FastifyPluginAsync } from 'fastify';
import userRoutes from './user';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    await app.register(userRoutes, {
        prefix: '/user'
    })
}   