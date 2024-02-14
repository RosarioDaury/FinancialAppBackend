import { create } from "./cases/create";
import { getCategories, getCategoriesAll } from "./cases/get";

const Categories = {
    get: {
        all: getCategoriesAll,
        Pagination: getCategories
    },
    create
}

export default Categories;