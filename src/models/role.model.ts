import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { User } from './user.model';
type RoleAttributes = {
  role_id: number;
  name: string;
  slug: string;
};

export class Role extends Model<
  RoleAttributes,
  Optional<RoleAttributes, 'role_id'>
> {
  declare role_id: number;
  declare name: string;
  declare slug: string;
}

Role.init(
  {
    role_id: {
      type: DataTypes.BIGINT,
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
    tableName: 'roles',
    timestamps: true,
    sequelize,
  }
);
