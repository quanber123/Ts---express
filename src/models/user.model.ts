import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { Role } from './role.model';
type UserAttributes = {
  user_id: number;
  username: string;
  slug: string;
  password: string;
  email: string;
  avatar?: string | null;
  birthday?: Date | string | null;
  isVerified?: boolean;
  role: string | number | null;
  created_at: string;
  updated_at: string;
};
type UserCreationAttributes = Optional<UserAttributes, 'user_id'>;
export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare user_id: number;
  declare username: string;
  declare slug: string;
  declare password: string;
  declare email: string;
  declare avatar?: string | null;
  declare birthday?: Date | string | null;
  declare isVerified?: boolean;
  declare created_at: string;
  declare updated_at: string;
}

User.init(
  {
    user_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    slug: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    birthday: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
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
    role: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'role_id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  }
);
User.belongsTo(Role, { foreignKey: 'role', as: 'roleInfo' });
