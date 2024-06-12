import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

class ValidateMiddleware {
  public validateMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors: { [key: string]: string } = {};
      errors.array().forEach((err) => {
        if ('path' in err) {
          formattedErrors[err.path] = err.msg;
        }
      });
      return res
        .status(400)
        .json({ message: 'Not enough information!', errors: formattedErrors });
    }
    next();
  }
}

export default new ValidateMiddleware();
