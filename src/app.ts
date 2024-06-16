import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { sequelize } from './config/postgresql';
import { routerEmployee } from './routes/employee.router';
import { routerCategory } from './routes/category.router';
import { routerUser } from './routes/user.router';
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
app.use(cors());
app.use('/public', express.static('public'));
app.use(routerUser);
app.use(routerEmployee);
app.use(routerCategory);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
