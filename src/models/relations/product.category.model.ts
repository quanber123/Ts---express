import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/postgresql';
import { Product } from '../product.model';
import { Category } from '../category.model';
type ProductCategoryAttributes = {
  product_id: string | number;
  category_id: string | number;
};

export class ProductCategory extends Model<ProductCategoryAttributes> {
  declare product_id: number;
  declare category_id: number;
}

ProductCategory.init(
  {
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Product,
        key: 'product_id',
      },
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Category,
        key: 'category_id',
      },
      primaryKey: true,
    },
  },
  {
    tableName: 'product_categories',
    sequelize,
  }
);
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'product_id',
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
});
