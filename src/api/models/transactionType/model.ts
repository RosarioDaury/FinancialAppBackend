import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';

export interface TransactionTypesAttributes {
    id: number,
    type: string,
    createdAt: Date,
    updatedAt: Date
}

export type PartialTransactionTypesAttributes = Partial<TransactionTypesAttributes>

interface TransactionTypes extends Model<TransactionTypesAttributes> {}
class TransactionTypes extends Model<TransactionTypesAttributes>
implements TransactionTypesAttributes {
    declare id: number;
    declare type: string;

    declare createdAt: Date;
    declare updatedAt: Date;
}


TransactionTypes.init(
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
        tableName: 'FaTransactionTypes',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)

export const TransactionTypeTableName = TransactionTypes.tableName;
export default TransactionTypes;