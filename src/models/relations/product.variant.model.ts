import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/postgresql';
import { Product } from '../product.model';
import { Tag } from '../tag.model';
import { Variant } from '../variant.model';
type ProductVariantAttributes = {
  productId: string | number;
  variantId: string | number;
};

export class ProductVariant extends Model<ProductVariantAttributes> {
  declare productId: number;
  declare variantId: number;
}

ProductVariant.init(
  {
    productId: {
      type: DataTypes.BIGINT,
      references: {
        model: Product,
        key: 'product_id',
      },
    },
    variantId: {
      type: DataTypes.BIGINT,
      references: {
        model: Variant,
        key: 'variant_id',
      },
    },
  },
  {
    tableName: 'product_variants',
    timestamps: true,
    sequelize,
  }
);
Product.belongsToMany(Tag, {
  through: ProductVariant,
});
Variant.belongsToMany(Product, {
  through: ProductVariant,
});
