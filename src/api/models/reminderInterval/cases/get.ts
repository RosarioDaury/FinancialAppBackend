import ReminderIntervals, {ReminderIntervalsAttributes} from "#/models/reminderInterval/model";

const get = async (): Promise<ReminderIntervalsAttributes[]> => {
    const data: ReminderIntervalsAttributes[] = await ReminderIntervals.findAll();
    return data;
}

export {
    get
}