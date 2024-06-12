import { Request, Response } from 'express';
import { Employee } from '../models/employee.model';

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
}

export default new EmployeeControllers();
