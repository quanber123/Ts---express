import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { History } from './history.model';

type UserAttributes = {
  user_id: number;
  username: string;
  slug: string;
  password: string;
  email: string;
  birthday: string;
  isVerified: boolean;
  isAdmin: boolean;
  isSale: boolean;
  isManager: boolean;
  isAccountant: boolean;
  isViewer: boolean;
};
type UserCreationAttributes = Optional<UserAttributes, 'user_id'>;
export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare user_id: number;
  declare username: string;
  declare slug: string;
  declare password: string;
  declare email: string;
  declare birthday: string;
  declare isVerified: boolean;
  declare isAdmin: boolean;
  declare isSale: boolean;
  declare isManager: boolean;
  declare isAccountant: boolean;
  declare isViewer: boolean;
}

User.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
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
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    birthday: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isSale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isManager: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAccountant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isViewer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);
User.hasMany(History, { foreignKey: 'user_id' });
