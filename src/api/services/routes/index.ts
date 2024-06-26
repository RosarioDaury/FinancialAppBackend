import type { FastifyPluginAsync } from 'fastify';
import userRoutes from './user';
import categoryRoutes from './category';
import transactionRoutes from './transaction';
import intervalRoutes from './reminderIntervals';
import reminderRoutes from './reminder';
import reminderNotificationRoutes from './reminderNotification';
import emailSender from './emailSender';

export default <FastifyPluginAsync> async function (app): Promise<void> {
    await app.register(userRoutes, {
        prefix: '/user'
    })

    await app.register(categoryRoutes, {
        prefix: '/category'
    })

    await app.register(transactionRoutes, {
        prefix: '/transaction'
    })

    await app.register(intervalRoutes, {
        prefix: '/interval'
    })

    await app.register(reminderRoutes, {
        prefix: '/reminder'
    })

    await app.register(reminderNotificationRoutes, {
        prefix: '/reminder/notification'
    })
    
    await app.register(emailSender, {
        prefix: '/email'
    })
}   