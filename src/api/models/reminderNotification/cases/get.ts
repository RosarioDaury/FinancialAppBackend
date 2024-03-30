import ReminderNotifications, {ReminderNotificationsAttributes} from "#/models/reminderNotification/model";

type TByReminderId = (params: {
    reminderId: string
}) => Promise<ReminderNotificationsAttributes | []>

export const ByReminderId: TByReminderId = async ({reminderId}) => {
    const records = await ReminderNotifications.findOne({
        where: [
            {
                reminderId
            }
        ]
    })

    return records || []
}

