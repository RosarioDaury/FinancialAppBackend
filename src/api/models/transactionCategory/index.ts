import { create } from "./cases/create";
import { getCategories, getCategoriesAll, getCategoryById } from "./cases/get";

const Categories = {
    get: {
        all: getCategoriesAll,
        Pagination: getCategories,
        byId: getCategoryById
    },
    create
}

export default Categories;