import Categories from "#/models/transactionCategory/model";

export const remove = async ({id, userid}: {id: number, userid: number}): Promise<number> => {
    const record = await Categories.destroy({
        where: [
            {id: id},
            {user_id: userid}
        ]
    })

    return record;
}