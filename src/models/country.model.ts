import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgresql';

type CountryAttributes = {
  department_id: number;
  department_name: string;
  manager_id: number;
  location_id: number;
};
export class Country extends Model<CountryAttributes> {
  declare department_id: number;
  declare department_name: string;
  declare manager_id: number;
  declare location_id: number;
}

Country.init(
  {
    department_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    department_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: 'countries',
    sequelize,
  }
);
