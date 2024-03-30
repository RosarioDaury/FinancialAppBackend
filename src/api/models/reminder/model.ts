import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';
import ReminderIntervals from "#/models/reminderInterval/model";
import Users from '#/models/users/model'
export interface ReminderAttributes {
    id: number,
    user_id: number,
    amount: number,
    interval_id: number,
    date: Date,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

export type PartialReminderAttributes = Partial<ReminderAttributes>;
export interface ReminderCreationAttributes extends Optional<ReminderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Reminders extends Model<ReminderAttributes, ReminderCreationAttributes>
implements ReminderAttributes {
    declare id: number;
    declare user_id: number;
    declare amount: number;
    declare interval_id: number;
    declare date: Date;
    declare title: string;
    declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Reminders.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE(),
            allowNull: false
        },
        interval_id: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100),
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
        tableName: 'FaReminders',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
);


export const ReminderTableName = Reminders.tableName;
Reminders.hasOne(Users, {as: 'user', foreignKey: 'id', sourceKey: 'user_id'});
Reminders.hasOne(ReminderIntervals, {as: 'interval', foreignKey: 'id', sourceKey: 'interval_id'});

export default Reminders;