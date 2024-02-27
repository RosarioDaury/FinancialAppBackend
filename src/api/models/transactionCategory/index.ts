import { create } from "./cases/create";
import { getCategories, getCategoriesAll, getCategoryById } from "./cases/get";
import { remove } from "./cases/remove";

const Categories = {
    get: {
        all: getCategoriesAll,
        Pagination: getCategories,
        byId: getCategoryById
    },
    create, 
    remove
}

export default Categories;