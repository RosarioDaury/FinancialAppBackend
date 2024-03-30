import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';
import Reminders from "../reminder/model";


export interface ReminderNotificationsAttributes {
    id: number,
    externalId: string,
    reminderId: number,
    createdAt: Date,
    updatedAt: Date
}

export type PartialReminderNotificationAttributes  = Partial<ReminderNotificationsAttributes>;
export interface CreationReminderNotificationAttributes extends Optional<ReminderNotificationsAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

class ReminderNotifications extends Model<ReminderNotificationsAttributes, PartialReminderNotificationAttributes>
implements ReminderNotificationsAttributes {
    declare id: number;
    declare externalId: string;
    declare reminderId: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}


ReminderNotifications.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        externalId: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        reminderId: {
            type: DataTypes.TINYINT.UNSIGNED,
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
        tableName: 'FaReminderNotifications',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)

export const ReminderNotificationsTableName = ReminderNotifications.tableName;
ReminderNotifications.hasOne(Reminders, {as: 'reminder', foreignKey: 'id', sourceKey: 'reminderId'});

export default ReminderNotifications;
