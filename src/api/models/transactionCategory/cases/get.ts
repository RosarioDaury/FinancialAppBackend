import { Op } from "sequelize";
import Category from "../model";
import { CategoryAttributes } from "../model";
import { PaginationReturn } from "#/shared/interfaces/pagination";

type Pagination = (options: {
    id: number,
    page: number,
    pageSize: number
}) => Promise<PaginationReturn<CategoryAttributes>>

const getCategories: Pagination = async ({id, page, pageSize}) => {
    let data: CategoryAttributes[] = []
    const count: number = await Category.count({
        where: [
            {
                id: id
            }
        ]
    });

    if(count > 0) {
        data = await Category.findAll({
            where: [
                {id: id}
            ],
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

const getCategoriesAll = async ({id}: {id: number}): Promise<Category[]>=> {
    const categories = await Category.findAll({
        where: [
            {id: id}
        ]
    })

    return categories;
}

export {
    getCategories,
    getCategoriesAll
}

