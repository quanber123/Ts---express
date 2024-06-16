import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { User } from './user.model';
type ProductAttributes = {
  product_id: number;
  name: string;
  slug: string;
  images: string[];
  price: number;
  formatPrice: string;
  published: boolean;
  created_by: string | number | null;
  created_at: string;
  updated_at: string;
};

export class Product extends Model<
  ProductAttributes,
  Optional<ProductAttributes, 'product_id'>
> {
  declare product_id: number;
  declare name: string;
  declare slug: string;
  declare images: string[];
  declare price: number;
  declare published: boolean;
  declare created_by: string | number | null;
  declare created_at: string;
  declare updated_at: string;
}

Product.init(
  {
    product_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    slug: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(1000),
      allowNull: false,
    },
    formatPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onDelete: 'SET NULL',
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
    tableName: 'products',
    timestamps: false,
    sequelize,
  }
);

Product.belongsTo(User, { foreignKey: 'created_by', as: 'userInfo' });
