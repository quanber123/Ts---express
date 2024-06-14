import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Category } from './category.model';
import { User } from './user.model';
import { Variant } from './variant.model';
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
      type: DataTypes.ARRAY,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    formatPrice: {
      type: new DataTypes.STRING(),
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

Product.belongsToMany(Category, {
  through: 'product_category',
  as: 'categories',
});
Product.belongsToMany(Variant, { through: 'product_variant', as: 'variants' });

Product.belongsTo(User, { foreignKey: 'created_by' });
