import { DataTypes, Model, Optional } from "sequelize";
import {dbConnection} from '#database';
import User from "../user/model";

export interface CategoriesAttributes {
    id: number,
    name: string,
    user: number,
    limit: number,
    createdAt: Date,
    updatedAt: Date
}


export type PartialCategoryAttributes = Partial<CategoriesAttributes>
export interface CategoriesCreationAttributes extends Optional<CategoriesAttributes, 'id' | 'createdAt' | 'updatedAt'>{}

class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> 
implements CategoriesAttributes {
    declare id: number;
    declare name: string;
    declare user: number;
    declare limit: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}



Categories.init(
    {
        id: {
            type: DataTypes.TINYINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        user: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        limit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: false
        }
    },
    {
        tableName: 'FaCategories',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize: dbConnection
    }
)


export const CategoriesTableName = Categories.tableName;
Categories.hasOne(User, {as: 'user', foreignKey: 'id', sourceKey: 'user'});

export default Categories;