import Categories from "#/models/transactionCategory";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";
import { CategoriesCreationAttributes } from "#/models/transactionCategory/model";
const getCategories: TokenRequestHandler<{Querystring: {page: number, pageSize: number}}> = async (req, res) => {
    try {
        const {user: {id}} = req.headers
        const {page, pageSize} = req.query;

        const {pagination, data} = await Categories.get.Pagination({id: id, page: page ?? 1, pageSize: pageSize ?? 6})
        return res.res200({
            pagination,
            data
        })
    } catch(error) {
        res.registerError({
            title: "[Error] GET CATEGORIES",
            code: 'c-1',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

interface CreationAttributes extends Omit<CategoriesCreationAttributes, 'id' | 'user_id' | 'createdAt' | 'updatedAt'> {}

const create: TokenRequestHandler<{Body: CreationAttributes}> = async (req, res) => {
    try {
        const {user} = req.headers;
        const {name, limit} = req.body
        const newCategory: CategoriesCreationAttributes = {
            name,
            user_id: user.id,
            limit
        }

        const category = await Categories.create(newCategory);
        res.res200({
            id: category.id,
            message: 'Category Created'
        })

    } catch(error) {
        res.registerError({
            title: "[Error] CREATE CATEGORY",
            code: 'c-2',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}   



export default {
    getCategories,
    create
}



