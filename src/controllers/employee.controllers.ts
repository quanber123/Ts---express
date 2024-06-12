import { Request, Response } from 'express';
import { Employee, EmployeeAttributes } from '../models/employee.model';

class EmployeeControllers {
  async getAllEmployees(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;
    const curPage = page ? Number(page) : 1;
    const limit = 20;
    try {
      const { rows, count } = await Employee.findAndCountAll({
        offset: (curPage - 1) * limit,
        limit: limit,
      });
      return res.status(200).json({
        error: false,
        success: true,
        employees: rows,
        totalPage: Math.ceil(count / limit),
      });
    } catch (error) {
      return res.status(500).json({ message: '500 server' });
    }
  }
  async createEmployee(req: Request, res: Response): Promise<Response> {
    try {
      const employee: Omit<EmployeeAttributes, 'employee_id'> = req.body;
      const existedEmployee = await Employee.findOne({
        where: {
          first_name: employee.first_name,
          last_name: employee.last_name,
        },
      });
      if (existedEmployee)
        return res.status(409).json({ message: 'Employee already existed!' });
      const createdEmployee = await Employee.create({
        ...employee,
        hire_date: new Date(),
      });
      return res.status(200).json({
        message: 'Add employee successfully!',
        employee: createdEmployee,
      });
    } catch (error) {
      return res.status(500).json({ message: '500 server' });
    }
  }
}

export default new EmployeeControllers();
