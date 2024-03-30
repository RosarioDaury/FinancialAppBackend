import Reminders, {ReminderAttributes} from "#/models/reminder/model";
import { Op } from "sequelize";
import { PaginationReturn } from "#/shared/interfaces/pagination";
import { dbConnection } from "#database";

type Pagination = (params: {
    userid: number,
    page: number,
    pageSize: number,
    title: string
}) => Promise<PaginationReturn<ReminderAttributes>>;

const getPagination: Pagination = async ({userid, page = 1, pageSize = 6, title}) => {
    let records: ReminderAttributes[] = [];
    const count = await Reminders.count({
        where: [
            {user_id: userid}
        ]
    })

    if(count > 0) {
        let limit = pageSize;
        let offset = (pageSize) * (page - 1)
        let spQuery;
        if(title) {
            spQuery = `CALL FA_GET_REMINDERS_FILTER(${offset}, ${limit}, ${userid}, '${title}');`
        } else {
            spQuery = `CALL FA_GET_REMINDERS(${offset}, ${limit}, ${userid});`
        }

        records = await dbConnection.query(spQuery) as ReminderAttributes[];
    }


    const pages = pageSize > 0 ? Math.ceil(count / pageSize) : 1;

    return {
        pagination: {
            result: count,
            pages,
            prevPage: page === 1 ? 0 : page -1,
            currentPage: page,
            nextPage: page >= pages ? 0 : page + 1
        },
        data: records
    }
}

type ById = (params: {
    userId: number,
    id: number
}) => Promise<ReminderAttributes>;

const byId: ById = async ({userId, id}) => {
    const spQuery = `CALL FA_GET_REMINDERS_FILTER_BYID(${userId}, ${id});`

    const record = await dbConnection.query(spQuery);
    console.log(record)
    
    return record.length > 0 ? record[0] as unknown as ReminderAttributes : {} as ReminderAttributes
}   

export {
    getPagination,
    byId
}