import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';

type VariantAttributes = {
  variant_id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export class Variant extends Model<
  VariantAttributes,
  Optional<VariantAttributes, 'variant_id'>
> {
  declare variant_id: number;
  declare name: string;
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
    name: {
      type: new DataTypes.STRING(128),
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
