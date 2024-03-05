import Reminders from "#/models/reminder/model";

type TremoveReminder = (params: {
    id: number
}) => Promise<number>

const remove: TremoveReminder = async ({id}) => {
    const record = await Reminders.destroy({
        where: [
            {
                id
            }
        ]
    });
    return record;
}   

export {
    remove
}