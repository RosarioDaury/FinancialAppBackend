import ReminderNotifications, {PartialReminderNotificationAttributes, ReminderNotificationsAttributes} from "#/models/reminderNotification/model";

type TCreateReminderNotification = (params: {
    notification: PartialReminderNotificationAttributes
}) => Promise<ReminderNotificationsAttributes>


export const create: TCreateReminderNotification = async ({notification}) => {
    const record = await ReminderNotifications.create(notification, { raw: true })
    return record;
}
