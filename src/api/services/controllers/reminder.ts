import Reminders from "#/models/reminder";
import { ReminderCreationAttributes } from "#/models/reminder/model";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";

const getReminders: TokenRequestHandler<{Querystring: {page: number, pageSize: number, title: string}}> = async (req, res) => {
    try {
        const {
            user: {id}
        } = req.headers;

        const {
            page,
            pageSize,
            title
        } = req.query;

        const {data, pagination} = await Reminders.get.getPagination({userid: id, page, pageSize, title});
        return res.res200({
            data,
            pagination
        })

    } catch(error) {
        res.registerError({
            title: "[Error] GET REMINDERS",
            code: 'R-1',
            error: String(error)
        })  

        return res.res500({
            error: String(error)
        })
    }
}   

const getReminderById: TokenRequestHandler<{Params: {id: number}}> = async (req, res) => {
    try {
        const {
            user
        } = req.headers;

        const {id} = req.params;

        const data = await Reminders.get.byId({userId: user.id, id})
        return res.res200({
            data
        });

        
    } catch(error) {
        res.registerError({
            title: "[Error] GET REMINDERS BY ID",
            code: 'R-1',
            error: String(error)
        })  

        return res.res500({
            error: String(error)
        })
    }
}

const createRemider: TokenRequestHandler<{Body: ReminderCreationAttributes}> = async (req, res) => {
    try{
        const {
            amount,
            interval_id,
            date,
            title,
            description,
            
        } = req.body;

        const {
            user: {id}
        } = req.headers

        const record = await Reminders.create(
            {
                reminder: {
                    amount, 
                    interval_id,
                    date,
                    title,
                    description, 
                    user_id: id
                }
            }
        );

        return res.res200({
            id: record.id,
            message: 'Reminder Created'
        })
    } catch(error) {
        res.registerError({
            title: "[Error] CREATE REMINDERS",
            code: 'R-2',
            error: String(error)
        })  

        return res.res500({
            error: String(error)
        })
    }
}

const updateReminder: TokenRequestHandler<{Body: ReminderCreationAttributes, Params: {id: number}}> = async (req, res) => {
    try {
        const {
            date,
            amount, 
            interval_id,
            title,
            description
        } = req.body;

        const { id } = req.params
        await Reminders.update({id, reminder: {date, amount, interval_id, title, description}});

        res.res200({
            message: 'Reminder Updated',
            id: id,
        })

    } catch(error) {
        res.registerError({
            title: "[Error] UPDATE REMINDER",
            code: 'R-3',
            error: String(error)
        })  

        return res.res500({
            error: String(error)
        })
    }
}

const removeReminder : TokenRequestHandler<{Params: {id: number}}> = async (req, res) => {
    try {
        const { id } = req.params;
        await Reminders.remove({id});
        res.res200({
            id,
            message: 'Reminder deleted'
        })

    } catch(error) {
        res.registerError({
            title: "[Error] REMOVE REMINDER",
            code: 'R-3',
            error: String(error)
        })  

        return res.res500({
            error: String(error)
        })
    }
}

export default {
    getReminders,
    getReminderById,
    createRemider,
    updateReminder,
    removeReminder
}


