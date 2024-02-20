import Transactions from "#/models/transaction";
import { TransactionsCreationAttributes } from "#/models/transaction/model";
import Categories from "#/models/transactionCategory";
import TransactionTypes from "#/models/transactionType";
import Users from "#/models/users";
import { encryptUserJwt } from "#/shared/helpers/jwtHandler";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";
import { RouteHandler } from "fastify";

const getTransactionTypes: RouteHandler<{}> = async (req, res) => {
    try {
        const types = await TransactionTypes.get.getAll();
        return res.res200({
            data: types
        })
    } catch(error) {
        res.registerError({
            title: "[Error] GET TRANSACTION TYPES",
            code: 'T-1',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const getTransactionTotalsByTypes: TokenRequestHandler<{}> = async (req, res) => {
    try {
        const {user: {id}} = req.headers

        const totals = await TransactionTypes.get.getTotalByTypes({userId: id});
        return res.res200({
            data: totals
        })
    } catch(error) {
        res.registerError({
            title: "[Error] GET TRANSACTION TOTALS BY TYPES",
            code: 'T-2',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const getTransanctions: TokenRequestHandler<{Querystring: {page: number, pageSize: number, title: string, lastMonth: boolean, date: Date}}> = async (req, res) => {
    try {
        const {user: {id}} = req.headers;
        const {page, pageSize, title, lastMonth, date} = req.query;

        const {data, pagination} = await Transactions.get.get(
            {
                userId: id, 
                page: page ?? 1, 
                pageSize: pageSize ?? 5, 
                search: {
                    title, 
                    lastMonth, 
                    date
                }
            }
        );

        return res.res200({
            pagination,
            data
        })


    } catch(error) {
        res.registerError({
            title: "[Error] GET TRANSACTIONS",
            code: 'T-3',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const getTransactionsByType: TokenRequestHandler<{Querystring: {page: number, pageSize: number, title: string, lastMonth: boolean, date: Date}, Params: {typeId: number}}> = async (req, res) => {
    try {
        const {user: {id}} = req.headers;
        const {page, pageSize, title, lastMonth, date} = req.query;
        const {typeId} = req.params;

        const {data, pagination} = await Transactions.get.getByType(
            {
                userId: id, 
                type: typeId, 
                page: page ?? 1, 
                pageSize: pageSize ?? 5, 
                search: {
                    title, 
                    lastMonth, 
                    date
                }
            }
        );

        return res.res200({
            pagination,
            data
        })


    } catch(error) {
        res.registerError({
            title: "[Error] GET TRANSACTIONS BY TYPE",
            code: 'T-4',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const getTransactionsByCategory: TokenRequestHandler<{Querystring: {page: number, pageSize: number, title: string, lastMonth: boolean, date: Date}, Params: {categoryId: number}}> = async (req, res) => {
    try {
        const {user: {id}} = req.headers;
        const {page, pageSize, title, lastMonth, date} = req.query;
        const {categoryId} = req.params;

        const {data, pagination} = await Transactions.get.getByType(
            {
                userId: id, 
                type: categoryId, 
                page: page ?? 1, 
                pageSize: pageSize ?? 5, 
                search: {
                    title, 
                    lastMonth, 
                    date
                }
            }
        );

        return res.res200({
            pagination,
            data
        })


    } catch(error) {
        res.registerError({
            title: "[Error] GET TRANSACTIONS BY CATEGORY",
            code: 'T-4',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

const createTransaction: TokenRequestHandler<{Body: TransactionsCreationAttributes}> = async (req, res) => {
    try {
        const {user: {id, balance, username}} = req.headers;
        const {type_id, amount} = req.body;
        
        const transaction = await Transactions.create({transaction: {...req.body, user_id: id}});

        if(transaction[0].message) {
            return res.res500({
                error: transaction[0].message
            })
        }
        // VALIDATE IF USE HAS ENOUGH MONEY TO MAKE TRANSACTION AND UPDATE TOTAL BALANCE AFTER TRANSACTION IS CRATED
        switch (type_id) {
            case 1:
                await Users.update({id, updated: { balance: Number(balance + amount)} })
                break
            case 2: 
                if((balance - amount) < 0) {
                    return res.res500({
                        error: "Unsuficient balance to complete this transaction"
                    })
                }
                await Users.update({id, updated: { balance: Number(balance - amount)} })
                break
            default: 
                break
        }
        const userUpdated = await Users.get.byCredentials({username});
        const token = await encryptUserJwt(userUpdated!);

        return res.res200({
            id: transaction.id,
            message: 'Transaction Created',
            token
        })

    } catch (error) {
        res.registerError({
            title: "[Error] CREATE TRANSACTION",
            code: 'T-5',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}

export default {
    getTransactionTotalsByTypes,
    getTransactionTypes,
    getTransanctions,
    getTransactionsByType,
    getTransactionsByCategory,
    createTransaction
}

