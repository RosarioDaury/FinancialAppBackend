import { create } from "./cases/create";
import { byCredentials } from "./cases/get";
import { update } from "./cases/update";

const Users = {
    get: {
        byCredentials
    },
    create,
    update
}

export default Users;