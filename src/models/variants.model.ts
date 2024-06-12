import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Product } from './product.model';

type VariantAttributes = {
  variant_id: number;
  size: string;
  color: string;
  hexColor: string;
  quantity: number;
  availableQuantity: number;
  inStock: number;
};
export class Variant extends Model<VariantAttributes> {
  declare variant_id: number;
  declare size: string;
  declare color: string;
  declare hexColor: string;
  declare quantity: number;
  declare availableQuantity: number;
  declare inStock: number;
}

Variant.init(
  {
    variant_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    size: {
      type: new DataTypes.STRING(3),
      allowNull: false,
    },
    color: {
      type: new DataTypes.STRING(12),
      allowNull: false,
    },
    hexColor: {
      type: new DataTypes.STRING(7),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    availableQuantity: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'variants',
    timestamps: true,
    sequelize,
  }
);

Variant.belongsToMany(Product, { through: 'product_variant' });
