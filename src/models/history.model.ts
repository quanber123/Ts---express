// src/models/history.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { User } from './user.model';

interface HistoryAttributes {
  history_id: number;
  action: 'Tạo' | 'Cập nhật' | 'Sửa' | 'Xóa';
  user_id: number;
  target_id: number;
  details?: string;
}

interface HistoryCreationAttributes
  extends Optional<HistoryAttributes, 'history_id'> {}

export class History
  extends Model<HistoryAttributes, HistoryCreationAttributes>
  implements HistoryAttributes
{
  public history_id!: number;
  public action!: 'Tạo' | 'Cập nhật' | 'Sửa' | 'Xóa';
  public user_id!: number;
  public target_id!: number;
  public details?: string;

  // You can add class level methods and associations here
}

History.init(
  {
    history_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    target_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING(1024),
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

export default History;
