import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';

export interface ReminderIntervalsAttributes {
    id: number,
    title: string,
    interval: number,
    createdAt: Date,
    updatedAt: Date
}


export type PartialReminderIntervalsAttributes = Partial<ReminderIntervalsAttributes>
export interface ReminderIntervalsCreationAttributes extends Optional<ReminderIntervalsAttributes, 'id' | 'createdAt' | 'updatedAt'>{}


class ReminderIntervals extends Model<ReminderIntervalsAttributes, ReminderIntervalsCreationAttributes>
implements ReminderIntervalsAttributes {
    declare id: number;
    declare title: string;
    declare interval: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}


ReminderIntervals.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        interval: {
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
        tableName: 'FaReminderIntervals',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
);


export const ReminderIntervalsTableName = ReminderIntervals.tableName;

export default ReminderIntervals;
