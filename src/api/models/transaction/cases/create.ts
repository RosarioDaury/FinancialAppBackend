import Transactions from "../model";
import { TransactionsAttributes, TransactionsCreationAttributes } from "../model";

interface CreationAttributes extends Omit<TransactionsCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export const create = async (transaction: CreationAttributes): Promise<TransactionsAttributes> => {
    const record = await Transactions.create(transaction,{
        raw: true
    });

    return record;
}