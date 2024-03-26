import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';

export interface UserTypesAttributes {
    id: number,
    type: string,
    createdAt: Date,
    updatedAt: Date
}

export type PartialUserTypesAttributes = Partial<UserTypesAttributes>

interface UserTypes extends Model<UserTypesAttributes> {}
class UserTypes extends Model<UserTypesAttributes>
implements UserTypesAttributes {
    declare id: number;
    declare type: string;

    declare createdAt: Date;
    declare updatedAt: Date;
}


UserTypes.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: false
        }
    },
    {
        tableName: 'FaUserTypes',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)

export const UserTypeTableName = UserTypes.tableName;
export default UserTypes;