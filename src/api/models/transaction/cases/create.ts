import { dbConnection } from "#database";
import Transactions from "../model";
import { TransactionsAttributes, TransactionsCreationAttributes } from "../model";

interface CreationAttributes extends Omit<TransactionsCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export const create = async ({transaction}: {transaction: CreationAttributes}): Promise<TransactionsAttributes | any> => {
    let record;
    if(transaction.type_id == 1) {
        record = await Transactions.create(transaction,{
            raw: true
        });
        record = [record]
    } else {
        record = await dbConnection.query(`CALL fa_createTransaction(
            ${transaction.category_id},
            '${transaction.date}',
            '${transaction.title}',
            '${transaction.description}',
            ${transaction.amount},
            ${transaction.type_id},
            ${transaction.user_id}
        );`);
    }
    

    return record;
}