import { create } from "./cases/create";
import { get, getByCategory, getByType } from "./cases/get";
import { remove } from "./cases/remove";

const Transactions  = {
    get: {
        get,
        getByCategory,
        getByType
    },
    create,
    delete: remove
}

export default Transactions;