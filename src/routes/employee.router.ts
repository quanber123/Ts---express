import { Router, json } from 'express';
import employeeControllers from '../controllers/employee.controllers';
import validateMiddleware from '../middleware/validate.middleware';
import validate from '../utils/validate';

export const routerEmployee: Router = Router();

routerEmployee.use(json());
routerEmployee.get('/api/employees', employeeControllers.getAllEmployees);
routerEmployee.post(
  '/api/employees',
  validate.employeeValidationRules,
  validateMiddleware.validateMiddleware,
  employeeControllers.createEmployee
);
