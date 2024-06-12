import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Tag } from './tag.model';
import { Category } from './category.model';
import { Variant } from './variants.model';
type ProductAttributes = {
  product_id: number;
  name: string;
  slug: string;
  images: string[];
  price: number;
  formatPrice: string;
  published: boolean;
};

export class Product extends Model<ProductAttributes> {
  declare product_id: number;
  declare name: string;
  declare slug: string;
  declare images: string[];
  declare price: number;
  declare published: boolean;
}

Product.init(
  {
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
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
      type: DataTypes.NUMBER.UNSIGNED,
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
  },
  {
    tableName: 'products',
    timestamps: true,
    sequelize,
  }
);

Product.belongsToMany(Tag, { through: 'product_tag', as: 'tags' });
Product.belongsToMany(Category, {
  through: 'product_category',
  as: 'categories',
});
Product.belongsToMany(Variant, { through: 'product_variant', as: 'variants' });
