import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgresql';
type TagAttributes = {
  tag_id: number;
  name: string;
  slug: string;
};

export class Tag extends Model<TagAttributes> {
  declare tag_id: number;
  declare name: string;
  declare slug: string;
}

Tag.init(
  {
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
