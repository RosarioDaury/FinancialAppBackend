import Reminders, { PartialReminderAttributes } from '#/models/reminder/model';

type TupdateReminder = (params: {
    id: number,
    reminder : PartialReminderAttributes
}) => Promise<number[]>

const update: TupdateReminder = async ({id, reminder}) => {
    const record = await Reminders.update(reminder, {
        where: {
            id
        }
    });

    return record
}

export {
    update
}
