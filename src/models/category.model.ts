import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
type CategoryAttributes = {
  category_id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export class Category extends Model<
  CategoryAttributes,
  Optional<CategoryAttributes, 'category_id'>
> {
  declare category_id: number;
  declare name: string;
  declare slug: string;
  declare created_at: string;
  declare updated_at: string;
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
    created_at: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
    sequelize,
  }
);
