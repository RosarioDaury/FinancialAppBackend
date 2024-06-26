import Categories, { CategoriesAttributes } from "#/models/transactionCategory/model";
import { PaginationReturn } from "#/shared/interfaces/pagination";
import { dbConnection } from "#database";

type Pagination = (options: {
    id: number,
    page: number,
    pageSize: number,
    name: string
}) => Promise<PaginationReturn<CategoriesAttributes>>

const getCategories: Pagination = async ({id, page, pageSize, name}) => {
    let data: CategoriesAttributes[] = []
    const count: number = await Categories.count({
        where: [
            {
                user_id: id
            }
        ]
    });

    if(count > 0) {
        let limit = pageSize;
        let offset = (pageSize) * (page - 1)
        let spQuery;
        if(name) {
            spQuery = `CALL facategories_get_filter_name(${id}, ${offset}, ${limit}, '${name}');`
        } else {
            spQuery = `CALL facategories_get(${id}, ${offset}, ${limit});`
        }


        data = await dbConnection.query(spQuery) as CategoriesAttributes[];
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

const getCategoriesAll = async ({id}: {id: number}): Promise<CategoriesAttributes[]>=> {
    const categories = await Categories.findAll({
        where: [
            {id: id}
        ]
    })

    return categories;
}

const getCategoryById = async ({id}: {id: number}): Promise<CategoriesAttributes> => {
    const category = await Categories.findOne({
        where: [{
            id: id
        }]
    })

    return category!;
}


export {
    getCategories,
    getCategoriesAll,
    getCategoryById
}

