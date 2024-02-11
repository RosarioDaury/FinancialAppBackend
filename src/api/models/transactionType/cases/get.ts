import { PartialTransactionTypesAttributes } from "../model";

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

export const getOne = ( filter: string | number ): PartialTransactionTypesAttributes => {
    if(typeof filter == 'number') return TransactionTypes.filter(type => type.id == filter)[0] || {};
    if(typeof filter == 'string') return TransactionTypes.filter(type => type.type == filter)[0] || {};

    return {};
}