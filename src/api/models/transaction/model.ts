import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';
import Categories from "../transactionCategory/model";
import TransactionTypes from "../transactionType/model";
import Users from "../users/model";

export interface TransactionsAttributes {
    id: number,
    user_id: number,
    date: Date,
    title: string,
    description: string,
    amount: number,
    type_id: number,
    category_id: number,
    createdAt: Date,
    updatedAt: Date
}


export type PartialTransactionsAttributes = Partial<TransactionsAttributes>;
export interface TransactionsCreationAttributes extends Optional<TransactionsAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Transactions extends Model<TransactionsAttributes, TransactionsCreationAttributes>
implements TransactionsAttributes {
    declare id: number;
    declare user_id: number;
    declare date: Date;
    declare title: string;
    declare description: string;
    declare amount: number;
    declare type_id: number;
    declare category_id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Transactions.init(
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
        amount: {
            type: DataTypes.DOUBLE(),
            allowNull: false
        },
        type_id: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
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
        tableName: 'FaTransactions',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
);


export const TransactionsTableName = Transactions.tableName;
Transactions.hasOne(Users, {as: 'user', foreignKey: 'id', sourceKey: 'user_id'});
Transactions.hasOne(TransactionTypes, {as: 'type', foreignKey: 'id', sourceKey: 'type_id'});
Transactions.hasOne(Categories, {as: 'category', foreignKey: 'id', sourceKey: 'category_id'});

export default Transactions;