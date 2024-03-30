import ReminderNotifications from "#/models/reminderNotification/model";

type TremoveReminder = (params: {
    id: string
}) => Promise<number>

const remove: TremoveReminder = async ({id}) => {
    const record = await ReminderNotifications.destroy({
        where: [
            {
                externalId: id
            }
        ]
    });
    return record;
}   

export {
    remove
}