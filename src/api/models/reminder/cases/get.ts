import Reminders, {ReminderAttributes} from "#/models/reminder/model";
import { Op } from "sequelize";
import { PaginationReturn } from "#/shared/interfaces/pagination";

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
        records = await Reminders.findAll({
            where: {
                [Op.and]: [
                    {user_id: userid},
                    title ? {title: { [Op.like]: `%${title}%` }} : {},
                ]
            },
            offset: pageSize > 0 ? ((pageSize) * (page - 1)) : undefined,
            limit: pageSize > 0 ? pageSize : undefined,
            include: [
                {
                    association: 'interval',
                    attributes: ['id', 'title']
                }
            ]
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

type ById = (params: {
    userId: number,
    id: number
}) => Promise<ReminderAttributes>;

const byId: ById = async ({userId, id}) => {
    const record = await Reminders.findOne({
        where: {
            [Op.and]: {
                user_id: userId,
                id: id
            }
        }
    });

    return record as ReminderAttributes
}   

export {
    getPagination,
    byId
}