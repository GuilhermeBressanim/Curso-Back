import { DataTypes, Optional, Model } from "sequelize"
import { sequelize } from "../database"

export interface Category {
    id: number,
    name: string,
    position: number
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'> { }

export interface CategoryInstace extends Model<Category, CategoryCreationAttributes>, Category { }

export const Category = sequelize.define<CategoryInstace, Category>('Category', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})