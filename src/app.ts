import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';
import { sequelize } from './config/postgresql';
import { routerEmployee } from './routes/employee.router';
config();
const app: Express = express();
const port = process.env.PORT || 3000;
(async () => {
  const connection = await sequelize.sync();
  if (connection) {
    console.log(`Postgresql connected port: ${process.env.DATABASE_PORT}`);
  } else {
    throw Error('Failed to connect postgres');
  }
})();
app.use(routerEmployee);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});