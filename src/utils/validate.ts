import { body, ValidationChain } from 'express-validator';

class ValidationRules {
  employeeValidationRules = (): ValidationChain[] => {
    return [
      body('first_name')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 1, max: 20 })
        .withMessage('First name must be between 1 and 20 characters'),
      body('last_name')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 1, max: 25 })
        .withMessage('Last name must be between 1 and 25 characters'),
      body('email').isEmail().withMessage('Must be a valid email address'),
      body('phone_number')
        .notEmpty()
        .withMessage('Phone number is required')
        .isNumeric()
        .withMessage('Phone number must be numeric')
        .isLength({ min: 1, max: 10 })
        .withMessage(
          'Phone number must be numeric and between 1 and 10 characters'
        ),
      body('job_id').notEmpty().withMessage('Job ID is required'),
      body('salary').isNumeric().withMessage('Salary must be a number'),
      body('manager_id').isInt().withMessage('Manager ID must be an integer'),
      body('department_id')
        .isInt()
        .withMessage('Department ID must be an integer'),
    ];
  };
  categoryValidateRules = (): ValidationChain[] => {
    return [
      body('name').notEmpty().withMessage('Nội dung tên không được để trống!'),
    ];
  };
}

export default new ValidationRules();
