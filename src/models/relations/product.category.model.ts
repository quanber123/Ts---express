import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/postgresql';
import { Product } from '../product.model';
import { Category } from '../category.model';
type ProductCategoryAttributes = {
  productId: string | number;
  categoryId: string | number;
};

export class ProductCategory extends Model<ProductCategoryAttributes> {
  declare productId: number;
  declare categoryId: number;
}

ProductCategory.init(
  {
    productId: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Product,
        key: 'product_id',
      },
    },
    categoryId: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Category,
        key: 'category_id',
      },
    },
  },
  {
    tableName: 'product_categories',
    timestamps: true,
    sequelize,
  }
);
Product.belongsToMany(Category, {
  through: ProductCategory,
});
Category.belongsToMany(Product, {
  through: ProductCategory,
});
