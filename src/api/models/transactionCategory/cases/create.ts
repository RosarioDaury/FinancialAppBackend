import Category from "../model";
import { CategoryAttributes, CategoryCreationAttributes } from "../model";

interface CreationAttributes extends Omit<CategoryCreationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export const create = async (category: CreationAttributes): Promise<CategoryAttributes> => {
    const record = await Category.create(category,{
        raw: true
    });

    return record;
}