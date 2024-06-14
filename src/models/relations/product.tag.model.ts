import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/postgresql';
import { Product } from '../product.model';
import { Tag } from '../tag.model';
type ProductTagAttributes = {
  product_id: string | number;
  tag_id: string | number;
};

export class ProductTag extends Model<ProductTagAttributes> {
  declare product_id: number;
  declare tag_id: number;
}

ProductTag.init(
  {
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Product,
        key: 'product_id',
      },
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Tag,
        key: 'tag_id',
      },
      primaryKey: true,
    },
  },
  {
    tableName: 'product_tags',
    sequelize,
  }
);
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });
