import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Product } from './product.model';
type CategoryAttributes = {
  category_id: number;
  name: string;
  slug: string;
};

export class Category extends Model<
  CategoryAttributes,
  Optional<CategoryAttributes, 'category_id'>
> {
  declare category_id: number;
  declare name: string;
  declare slug: string;
}

Category.init(
  {
    category_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    slug: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    timestamps: true,
    sequelize,
  }
);
