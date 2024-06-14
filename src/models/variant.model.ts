import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';

type VariantAttributes = {
  variant_id: number;
  name: string;
};

export class Variant extends Model<
  VariantAttributes,
  Optional<VariantAttributes, 'variant_id'>
> {
  declare variant_id: number;
  declare name: string;
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
  },
  {
    tableName: 'variants',
    sequelize,
  }
);
