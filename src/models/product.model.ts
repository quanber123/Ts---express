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
  created_by: string | number;
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
  declare created_by: string | number;
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
        model: User,
        key: 'user_id',
      },
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    sequelize,
  }
);

Product.belongsTo(User, { foreignKey: 'created_by' });
