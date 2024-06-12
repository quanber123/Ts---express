import { Router, json } from 'express';
import employeeControllers from '../controllers/employee.controllers';

export const routerEmployee: Router = Router();

routerEmployee.use(json());
routerEmployee.get('/api/employees', employeeControllers.getAllEmployees);
