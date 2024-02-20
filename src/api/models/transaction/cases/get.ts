import { Op } from "sequelize";
import Transactions, {TransactionsAttributes} from "../model";
import { PaginationReturn } from "#/shared/interfaces/pagination";

type Pagination = (options: {
    userId: number,
    page: number,
    pageSize: number,
    search: {
        title: string,
        lastMonth: boolean,
        date: Date
    }
}) => Promise<PaginationReturn<TransactionsAttributes>>


const get: Pagination = async ({userId, page, pageSize, search}) => {
    let data: TransactionsAttributes[] = []
    const count: number = await Transactions.count({
        where: [
            {
                user_id: userId
            }
        ]
    });

    if(count > 0) {
        data = await Transactions.findAll({
            where: {
                [Op.and]: [
                    {user_id: userId},
                    search.title ? {title: search.title} : {},
                    search.lastMonth 
                    ? 
                        {
                            date: {
                                [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
                            }
                        } 
                    : 
                        {},
                    search.date ? { date : search.date} : {}
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
        data: data
    }
}  

type PaginationByType = (options: {
    userId: number,
    page: number,
    pageSize: number,
    type: number
    search: {
        title: string,
        lastMonth: boolean,
        date: Date,
    }
}) => Promise<PaginationReturn<TransactionsAttributes>>

const getByType: PaginationByType = async ({userId, type, page, pageSize, search}) => {
    let data: TransactionsAttributes[] = []
    const count: number = await Transactions.count({
        where: {
            [Op.and]: [
                {user_id: userId},
                {type_id: type}
            ]
        }
    });

    if(count > 0) {
        data = await Transactions.findAll({
            where: {
                [Op.and]: [
                    {user_id: userId},
                    {type_id: type},
                    search.title ? {title: search.title} : {},
                    search.lastMonth 
                        ? 
                            {
                                date: {
                                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
                                }
                            } 
                        : 
                            {},
                    search.date ? { date : search.date} : {}
                ]
            },
            order: [['date', 'ASC']],
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
        data: data
    }
}

const getByCategory: PaginationByType = async ({userId, type, page, pageSize, search}) => {
    let data: TransactionsAttributes[] = []
    const count: number = await Transactions.count({
        where: {
            [Op.and]: [
                {user_id: userId},
                {category_id: type}
            ]
        }
    });

    if(count > 0) {
        data = await Transactions.findAll({
            where: {
                [Op.and]: [
                    {user_id: userId},
                    {category_id: type},
                    {
                        [Op.or]: [
                            search.title ? {title: search.title} : {},
                            search.lastMonth 
                                ? 
                                    {
                                        date: {
                                            [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                            [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
                                        }
                                    } 
                                : 
                                    {},
                            search.date ? { date : search.date} : {}
                        ]
                    }
                ]
            },
            order: [['name', 'ASC']],
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
        data: data
    }
}



export {
    get, 
    getByType,
    getByCategory
}