import { body, ValidationChain } from 'express-validator';

class ValidationRules {
  categoryValidateRules = (): ValidationChain[] => {
    return [
      body('name').notEmpty().withMessage('Nội dung tên không được để trống!'),
    ];
  };
  tagValidateRules = (): ValidationChain[] => {
    return [
      body('name').notEmpty().withMessage('Nội dung tên không được để trống!'),
    ];
  };
}

export default new ValidationRules();
