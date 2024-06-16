import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { User } from './user.model';
type HistoryAttributes = {
  history_id: number;
  action: 'Tạo' | 'Cập nhật' | 'Sửa' | 'Xóa';
  userId: number | null;
  target_id: number;
  details: string;
  created_at: string;
};

export class History extends Model<
  HistoryAttributes,
  Optional<HistoryAttributes, 'history_id'>
> {
  declare history_id: number;
  declare action: 'Tạo' | 'Cập nhật' | 'Sửa' | 'Xóa';
  declare userId: number | null;
  declare target_id: number;
  declare details: string;
  declare created_at: string;
}

History.init(
  {
    history_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id',
      },
      onDelete: 'SET NULL',
    },
    target_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    details: {
      type: new DataTypes.STRING(1024),
      allowNull: true,
    },
    created_at: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: 'histories',
    timestamps: false,
    sequelize,
  }
);
History.belongsTo(User, { foreignKey: 'userId', as: 'historyInfo' });
