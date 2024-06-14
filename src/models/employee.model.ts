import { DataTypes, Model, Optional } from 'sequelize';
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

export class Employee extends Model<
  EmployeeAttributes,
  Optional<EmployeeAttributes, 'employee_id'>
> {
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
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.CHAR(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20],
      },
    },
    last_name: {
      type: new DataTypes.CHAR(25),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25],
      },
    },
    email: {
      type: new DataTypes.CHAR(25),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: new DataTypes.CHAR(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20],
      },
    },
    hire_date: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    job_id: {
      type: new DataTypes.CHAR(128),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    salary: {
      type: DataTypes.DECIMAL(1000),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    commission_pct: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    manager_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    department_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
  },
  {
    tableName: 'employees',
    sequelize,
    timestamps: false,
  }
);
