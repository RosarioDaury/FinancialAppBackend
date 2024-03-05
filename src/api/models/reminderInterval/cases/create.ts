import ReminderIntervals, {ReminderIntervalsCreationAttributes, ReminderIntervalsAttributes} from "#/models/reminderInterval/model";

interface CreationAttributes extends Omit<ReminderIntervalsCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

type TcreateReminderInterval = (options: {
    reminder: CreationAttributes
}) => Promise<ReminderIntervalsAttributes>

const create: TcreateReminderInterval = async ({reminder}) => {
    const record = await ReminderIntervals.create(reminder, {raw: true});
    return record
}   

export {
    create
}
