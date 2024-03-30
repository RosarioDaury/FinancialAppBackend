import ReminderNotifications from "#/models/reminderNotification";
import { PartialReminderNotificationAttributes } from "#/models/reminderNotification/model";
import { encryptUserJwt } from "#/shared/helpers/jwtHandler";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";
import { RouteHandler } from "fastify";

const getReminderNotificationById: RouteHandler<{Params: {reminderId: string}}> = async (req, res) => {
    try {
        const {
            reminderId
        } = req.params;

        const data = await ReminderNotifications.get.byId({reminderId});

        return res.res200({
            data
        })
    } catch(error) {
        res.registerError({
            title: "[Error] GET REMINDER NOTIFICATIONS",
            code: 'RN-1',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

type TUpdateReminderNotification = {currentId: string, newId: string}
const updateReminderNotification: RouteHandler<{Body: TUpdateReminderNotification }> = async (req, res) => {
    try{
        const {
            currentId,
            newId
        } = req.body;

        await ReminderNotifications.update({
            reminder: {externalId: newId},
            currentId
        })

        res.res200({
            message: 'Reminder Notification Updated',
            id: newId,
        })

    } catch(error) {
        res.registerError({
            title: "[Error] UPDATE REMINDER NOTIFICATIONS",
            code: 'RN-2',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const createRemindeNotification: RouteHandler<{Body: PartialReminderNotificationAttributes}> = async (req, res) => {
    try {
        const {
            reminderId,
            externalId
        } = req.body;

        const record = await ReminderNotifications.create({
            notification: {
                externalId,
                reminderId
            }
        })

        return res.res200({
            id: record.id,
            message: 'Reminder Notification Created'
        })

    } catch(error) {
        res.registerError({
            title: "[Error] CREATE REMINDER NOTIFICATIONS",
            code: 'RN-3',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const removeReminderNotification: RouteHandler<{Params: {id: string }}> = async (req, res) => {
    try{
        const { id } = req.params;
        await ReminderNotifications.remove({id});

        return res.res200({
            id: id,
            message: 'Reminder Notification Deleted'
        })

    } catch(error) {
        res.registerError({
            title: "[Error] DELETE REMINDER NOTIFICATIONS",
            code: 'RN-3',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

export default {
    getReminderNotificationById,
    updateReminderNotification,
    createRemindeNotification,
    removeReminderNotification
}
