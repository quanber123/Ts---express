import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { History } from './history.model';

interface UserAttributes {
  user_id: number;
  username: string;
  slug: string;
  password: string;
  email: string;
  birthday?: string | null;
  isVerified: boolean;
  isAdmin: boolean;
  isSale: boolean;
  isManager: boolean;
  isAccountant: boolean;
  isViewer: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public user_id!: number;
  public username!: string;
  public slug!: string;
  public password!: string;
  public email!: string;
  public birthday?: string | null;
  public isVerified!: boolean;
  public isAdmin!: boolean;
  public isSale!: boolean;
  public isManager!: boolean;
  public isAccountant!: boolean;
  public isViewer!: boolean;

  // You can add class level methods and associations here
}

User.init(
  {
    user_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
