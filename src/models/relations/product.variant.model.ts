import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/postgresql';
import { Product } from '../product.model';
import { Tag } from '../tag.model';
import { Variant } from '../variants.model';
type ProductVariantAttributes = {
  product_id: string | number;
  variant_id: string | number;
};

export class ProductVariant extends Model<ProductVariantAttributes> {
  declare product_id: number;
  declare variant_id: number;
}

ProductVariant.init(
  {
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Product,
        key: 'product_id',
      },
      primaryKey: true,
    },
    variant_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Variant,
        key: 'variant_id',
      },
      primaryKey: true,
    },
  },
  {
    tableName: 'product_variants',
    sequelize,
  }
);
Product.belongsToMany(Tag, {
  through: ProductVariant,
  foreignKey: 'product_id',
});
Variant.belongsToMany(Product, {
  through: ProductVariant,
  foreignKey: 'variant_id',
});
