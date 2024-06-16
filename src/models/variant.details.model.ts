import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Variant } from './variant.model';

type VariantDetailsAttributes = {
  variant_details_id: number;
  variantId: number;
  name: string;
  value: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export class VariantDetails extends Model<
  VariantDetailsAttributes,
  Optional<VariantDetailsAttributes, 'variant_details_id'>
> {
  declare variant_id: number;
  declare productId: number;
  declare quantity: number;
  declare created_at: string;
  declare updated_at: string;
}

VariantDetails.init(
  {
    variant_details_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    variantId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'variants',
        key: 'variant_id',
      },
      onDelete: 'SET NULL',
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    value: {
      type: new DataTypes.STRING(24),
      allowNull: false,
    },
    slug: {
      type: new DataTypes.STRING(24),
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
    tableName: 'variants_details',
    timestamps: false,
    sequelize,
  }
);

VariantDetails.belongsTo(Variant, {
  foreignKey: 'variantId',
  as: 'variantDetailsInfo',
});
