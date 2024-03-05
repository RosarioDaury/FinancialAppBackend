import ReminderIntervals, {PartialReminderIntervalsAttributes} from "#/models/reminderInterval/model";

type TupdateReminderInterval = (params: {
    id: number,
    reminderInterval: PartialReminderIntervalsAttributes
}) => Promise<number[]>

const update: TupdateReminderInterval = async ({id, reminderInterval}) => {
    const record = await ReminderIntervals.update(reminderInterval, {
        where: {
            id
        }
    });
    return record;
}

export {
    update
}