import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/postgresql';

export type EmployeeAttributes = {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: Date;
  job_id: string;
  salary: number;
  commission_pct: number;
  manager_id: number;
  department_id: number;
};
export class Employee extends Model<EmployeeAttributes> {
  declare employee_id: number;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare phone_number: string;
  declare hire_date: Date;
  declare job_id: string;
  declare salary: number;
  declare commission_pct: number;
  declare manager_id: number;
  declare department_id: number;
}

Employee.init(
  {
    employee_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.CHAR(20),
    },
    last_name: {
      type: new DataTypes.CHAR(25),
    },
    email: {
      type: new DataTypes.CHAR(25),
    },
    phone_number: {
      type: new DataTypes.CHAR(20),
    },
    hire_date: {
      type: new DataTypes.DATE(),
    },
    job_id: {
      type: new DataTypes.CHAR(128),
    },
    salary: {
      type: DataTypes.NUMBER.UNSIGNED,
    },
    commission_pct: {
      type: new DataTypes.STRING(128),
    },
    manager_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'employees',
    sequelize,
    timestamps: false,
  }
);
