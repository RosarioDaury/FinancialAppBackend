import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';

export interface TransactionTypeAttributes {
    id: number,
    type: string,
    createdAt: Date,
    updatedAt: Date
}

export type PartialTransactionTypesAttributes = Partial<TransactionTypeAttributes>

interface TransactionType extends Model<TransactionTypeAttributes> {}
class TransactionType extends Model<TransactionTypeAttributes>
implements TransactionTypeAttributes {
    declare id: number;
    declare type: string;

    declare createdAt: Date;
    declare updatedAt: Date;
}


TransactionType.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
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
        tableName: 'FaTransactionType',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)

export const TransactionTypeTableName = TransactionType.tableName;
export default TransactionType;