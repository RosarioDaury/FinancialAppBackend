import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';
import Category from "../transactionCategory/model";
import TransactionType from "../transactionType/model";
import User from "../user/model";

export interface TransactionAttributes {
    id: number,
    user: number,
    date: Date,
    title: string,
    description: string,
    amount: number,
    type: number,
    category: number,
    createdAt: Date,
    updatedAt: Date
}


export type PartialTransactionAttributes = Partial<TransactionAttributes>;
export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes>
implements TransactionAttributes {
    declare id: number;
    declare user: number;
    declare date: Date;
    declare title: string;
    declare description: string;
    declare amount: number;
    declare type: number;
    declare category: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Transaction.init(
    {

    },
    {
        tableName: 'FaTransactions',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)