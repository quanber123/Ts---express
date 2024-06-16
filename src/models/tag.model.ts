import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
type TagAttributes = {
  tag_id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export class Tag extends Model<
  TagAttributes,
  Optional<TagAttributes, 'tag_id'>
> {
  declare tag_id: number;
  declare name: string;
  declare slug: string;
  declare created_at: string;
  declare updated_at: string;
}

Tag.init(
  {
    tag_id: {
      type: DataTypes.BIGINT,
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
    tableName: 'tags',
    timestamps: false,
    sequelize,
  }
);
