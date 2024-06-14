import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/postgresql';
import { User } from './user.model';
type HistoryAttributes = {
  history_id: number;
  action: 'Tạo' | 'Cập nhật' | 'Sửa' | 'Xóa';
  userId: number;
  target_id: number;
  details: string;
};

export class History extends Model<
  HistoryAttributes,
  Optional<HistoryAttributes, 'history_id'>
> {
  declare history_id: number;
  declare action: 'Tạo' | 'Cập nhật' | 'Sửa' | 'Xóa';
  declare userId: number;
  declare target_id: number;
  declare details: string;
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
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    target_id: {
      type: DataTypes.BIGINT,
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
History.belongsTo(User, { foreignKey: 'userId' });
