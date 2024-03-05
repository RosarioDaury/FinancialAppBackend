import ReminderIntervals from "#/models/reminderInterval";
import { RouteHandler } from "fastify";

const getReminderIntervals: RouteHandler<{}> = async (req, res) => {
    try{
        const intervals = await ReminderIntervals.get();

        return res.res200({
            data: intervals
        })

    } catch (error) {
        res.registerError({
            title: "[Error] GET REMINDER INTERVALS",
            code: 'I-1',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const removeReminderIntervals: RouteHandler<{Params: {id: number}}> = async (req, res) => {
    try{
        const {
            id
        } = req.params

        await ReminderIntervals.remove({id});
        res.res200({
            id,
            message: 'Category deleted'
        })
    } catch(error) {
        res.registerError({
            title: "[Error] REMOVE REMINDER INTERVAL ",
            code: 'I-2',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}


export default {
    getReminderIntervals,
    removeReminderIntervals
}