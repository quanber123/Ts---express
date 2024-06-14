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
  },
  {
    tableName: 'users',
    timestamps: true,
    sequelize,
  }
);
