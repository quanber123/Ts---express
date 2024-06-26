import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Product } from './product.model';

type VariantAttributes = {
  variant_id: number;
  productId: number;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export class Variant extends Model<
  VariantAttributes,
  Optional<VariantAttributes, 'variant_id'>
> {
  declare variant_id: number;
  declare productId: number;
  declare quantity: number;
  declare created_at: string;
  declare updated_at: string;
}

Variant.init(
  {
    variant_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id',
      },
      onDelete: 'SET NULL',
    },
    quantity: {
      type: DataTypes.DECIMAL(10),
      allowNull: false,
    },
    created_at: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: 'variants',
    timestamps: false,
    sequelize,
  }
);

Variant.belongsTo(Product, { foreignKey: 'productId', as: 'variantInfo' });
