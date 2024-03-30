import ReminderNotifications, {PartialReminderNotificationAttributes} from "#/models/reminderNotification/model";

type TupdateReminder = (params: {
    reminder: PartialReminderNotificationAttributes,
    currentId: string
}) => Promise<string>

export const update: TupdateReminder = async ({reminder, currentId}) => {
    await ReminderNotifications.update(reminder, { 
        where: [{
            externalId: currentId
        }]
    });

    return currentId;
}
