import ReminderIntervals from "#/models/reminderInterval/model";

type TremoveReminderInterval = (params: {
    id: number
}) => Promise<number>

const remove: TremoveReminderInterval = async ({id}) => {
    const record = await ReminderIntervals.destroy({
        where: [
            {
                id
            }
        ]
    });
    return record;
};

export {
    remove
}