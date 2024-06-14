import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/postgresql';
import { Product } from '../product.model';
import { Tag } from '../tag.model';
type ProductTagAttributes = {
  productId: string | number;
  tagId: string | number;
};

export class ProductTag extends Model<ProductTagAttributes> {
  declare product_id: number;
  declare tag_id: number;
}

ProductTag.init(
  {
    productId: {
      type: DataTypes.BIGINT,
      references: {
        model: Product,
        key: 'product_id',
      },
    },
    tagId: {
      type: DataTypes.BIGINT,
      references: {
        model: Tag,
        key: 'tag_id',
      },
    },
  },
  {
    tableName: 'product_tags',
    timestamps: true,
    sequelize,
  }
);
Product.belongsToMany(Tag, { through: ProductTag });
Tag.belongsToMany(Product, { through: ProductTag });
