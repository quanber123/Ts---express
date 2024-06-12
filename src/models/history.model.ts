import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { User } from './user.model';
type HistoryAttributes = {
  history_id: number;
  action: string;
  user_id: number;
  target_id: number;
  details: string;
};

export class History extends Model<HistoryAttributes> {
  declare history_id: number;
  declare action: string;
  declare user_id: number;
  declare target_id: number;
  declare details: string;
}

History.init(
  {
    history_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    target_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    details: {
      type: new DataTypes.STRING(1024),
      allowNull: true,
    },
  },
  {
    tableName: 'histories',
    timestamps: true,
    sequelize,
  }
);
History.belongsTo(User, { foreignKey: 'user_id' });
