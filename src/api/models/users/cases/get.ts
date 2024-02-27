import { Op } from "sequelize";
import User from "../model";
import { UsersAttributes } from "../model";

export const byCredentials =  async ({username, email}: {username?: string, email?: string}): Promise<UsersAttributes | null> => {
    const users = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'username', 'password', 'email', 'active', 'balance', 'createdAt'],
        where: {
            [Op.or]: [
                email ? { email } : { email: '!^' },
                username ? { username } : { username: '!^' },
            ],
            active: true
        },
        include: [
            {
                association: 'type',
                attributes: ['id', 'type']
            }
        ],
    });


    return users?.toJSON() || null;
}