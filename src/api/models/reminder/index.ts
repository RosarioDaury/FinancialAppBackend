import { create } from "./cases/create";
import { getPagination, byId } from "./cases/get";
import { remove } from "./cases/remove";
import { update } from "./cases/update";

const Reminders = {
    get: {
        getPagination,
        byId
    },
    create,
    update,
    remove
}

export default Reminders;