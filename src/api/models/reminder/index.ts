import { create } from "./cases/create";
import { getPagination } from "./cases/get";
import { remove } from "./cases/remove";
import { update } from "./cases/update";

const Reminders = {
    get: {
        getPagination
    },
    create,
    update,
    remove
}