import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';
import UserType from "../userTypes/model";

export interface UsersAttributes {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    type_id: number,
    balance: number,
    active: boolean,
    createdAt: Date,
    updatedAt: Date
}

export type PartialUsersAttributes = Partial<UsersAttributes>;
export interface UsersCreationAttributes extends Optional<UsersAttributes, 'id' | 'active' | 'createdAt' | 'updatedAt'> {}

class Users extends Model<UsersAttributes, UsersCreationAttributes>
implements UsersAttributes {
    declare id: number; 
    declare firstName: string;
    declare lastName: string;
    declare username: string;
    declare password: string;
    declare email: string;
    declare type_id: number;
    declare active: boolean;
    declare balance: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}


Users.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        type_id: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        balance: {
            type: DataTypes.INTEGER,
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
        tableName: 'FaUsers',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)

export const UserTableName = Users.tableName;
Users.hasOne(UserType, {as: 'type', foreignKey: 'id', sourceKey: 'type_id'});

export default Users;
