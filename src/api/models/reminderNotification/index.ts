import { create } from "./cases/create";
import { ByReminderId } from "./cases/get";
import { remove } from "./cases/remove";
import { update } from "./cases/update";

const ReminderNotifications = {
    get: {
        byId: ByReminderId
    },
    create,
    update,
    remove
}

export default ReminderNotifications;