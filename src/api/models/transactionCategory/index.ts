import { create } from "./cases/create";
import { getCategories, getCategoriesAll } from "./cases/get";

const Category = {
    get: {
        all: getCategoriesAll,
        Pagination: getCategories
    },
    create
}

export default Category;