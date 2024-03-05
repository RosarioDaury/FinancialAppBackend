import Transactions from "#/models/transaction/model";

export const remove = async (id: number): Promise<number> => {
    const record = await Transactions.destroy({
        where: [
            {id: id}
        ]
    })

    return record;
}