import Users, { PartialUsersAttributes } from "#/models/users/model";

type UpdateType = ({id, updated}: {id: number, updated: PartialUsersAttributes}) => Promise<number[]>

export const update: UpdateType = async ({id, updated}) => {
    const record = await Users.update(updated, {
        where: {
            id
        },
    });

    return record;
}