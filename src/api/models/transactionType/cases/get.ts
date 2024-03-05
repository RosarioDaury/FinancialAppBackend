import { PartialTransactionTypesAttributes } from "#/models/transactionType/model";
import Transactions, { TransactionsAttributes } from "#/models/transaction/model";
import { dbConnection } from "#database";
const TransactionTypes: PartialTransactionTypesAttributes[] = [
    {
        id: 1,
        type: 'Income'
    },
    {
        id: 2,
        type: 'Outcome'
    }
] 

export const getAll = (): PartialTransactionTypesAttributes[] => {
    return TransactionTypes
}

export const getOne = ( {filter}: {filter: string | number} ): PartialTransactionTypesAttributes => {
    if(typeof filter == 'number') return TransactionTypes.filter(type => type.id == filter)[0] || {};
    if(typeof filter == 'string') return TransactionTypes.filter(type => type.type == filter)[0] || {};

    return {};
}

export const getTotalByTypes = async ({userId}: {userId: number}): Promise<TransactionsAttributes[]> => {
    const total = Transactions.findAll({
        where: [
            {user_id: userId}
        ],
        attributes: [
            'type_id',
            [dbConnection.fn('sum', dbConnection.col('amount')), 'amount']
        ],
        group: ['type_id'],
        raw: true
    });


    return total;
}