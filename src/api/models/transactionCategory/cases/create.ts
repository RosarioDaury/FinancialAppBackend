import Category from "#/models/transactionCategory/model";
import { CategoriesAttributes, CategoriesCreationAttributes } from "#/models/transactionCategory/model";

interface CreationAttributes extends Omit<CategoriesCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export const create = async (category: CreationAttributes): Promise<CategoriesAttributes> => {
    const record = await Category.create(category,{
        raw: true
    });

    return record;
}