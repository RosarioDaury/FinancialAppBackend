import User from "../model";
import { UsersAttributes, UsersCreationAttributes } from "#/models/users/model";

interface CreationAttributes extends Omit<UsersCreationAttributes, 'id' | "active" | 'createdAt' | 'updatedAt'> {}

export const create = async (user: CreationAttributes): Promise<UsersAttributes> => {
    const record = await User.create(user,{
        raw: true
    });

    return record;
}