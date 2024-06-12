import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
config();
export const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: Number(process.env.DATABASE_PORT),
    pool: {
      max: 30,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
