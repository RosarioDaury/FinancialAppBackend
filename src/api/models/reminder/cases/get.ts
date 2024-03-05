import Reminders, {ReminderAttributes} from "#/models/reminder/model";
import { Op } from "sequelize";
import { PaginationReturn } from "#/shared/interfaces/pagination";

type Pagination = (params: {
    userid: number,
    page: number,
    pageSize: number,
    title: string
}) => Promise<PaginationReturn<ReminderAttributes>>;

const getPagination: Pagination = async ({userid, page, pageSize, title}) => {
    let records: ReminderAttributes[] = [];
    const count = await Reminders.count({
        where: [
            {user_id: userid}
        ]
    })

    if(count > 0) {
        records = await Reminders.findAll({
            where: {
                [Op.and]: [
                    {user_id: userid},
                    title ? {title: title} : {}
                ]
            },
            offset: pageSize > 0 ? ((pageSize) * (page - 1)) : undefined,
            limit: pageSize > 0 ? pageSize : undefined
        })
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

export {
    getPagination
}