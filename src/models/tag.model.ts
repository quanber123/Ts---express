import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Product } from './product.model';
import { ProductTag } from './relations/product.tag.model';
type TagAttributes = {
  tag_id: number;
  name: string;
  slug: string;
};

export class Tag extends Model<
  TagAttributes,
  Optional<TagAttributes, 'tag_id'>
> {
  declare tag_id: number;
  declare name: string;
  declare slug: string;
}

Tag.init(
  {
    tag_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    slug: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: 'tags',
    timestamps: true,
    sequelize,
  }
);
