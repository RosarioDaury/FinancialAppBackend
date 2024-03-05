import Reminders, {ReminderAttributes, ReminderCreationAttributes} from "#/models/reminder/model";

interface CreationAttributes extends Omit<ReminderCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

type TcreateReminder = (params: {
    reminder: CreationAttributes
}) => Promise<ReminderAttributes>

const create: TcreateReminder = async ({reminder}) => {
    const records = await Reminders.create(reminder, { raw: true });
    return records;
}

export {
    create
}