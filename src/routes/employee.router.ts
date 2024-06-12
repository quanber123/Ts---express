import { Router, json } from 'express';
import employeeControllers from '../controllers/employee.controllers';
import employeeValidationRules from '../utils/validate';
import validateMiddleware from '../middleware/validate.middleware';

export const routerEmployee: Router = Router();

routerEmployee.use(json());
routerEmployee.get('/api/employees', employeeControllers.getAllEmployees);
routerEmployee.post(
  '/api/employees',
  employeeValidationRules(),
  validateMiddleware,
  employeeControllers.createEmployee
);
