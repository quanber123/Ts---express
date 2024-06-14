import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';
import { blackList } from '../utils/token';
class Auth {
  async ValidateUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    const getToken = token?.split(' ')[1];

    if (!getToken) {
      return res
        .status(401)
        .json({ error: true, success: false, message: 'Token không tồn tại' });
    }

    if (blackList.has(getToken)) {
      return res.status(401).json({
        error: true,
        success: false,
        message: 'Token đã hết hạn hoặc không hợp lệ.',
      });
    }

    // using json web token
    jwt.verify(
      getToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({
            error: true,
            success: false,
            message: 'Token không chính xác!',
          });
        }
        if (decoded) {
          req.decoded = decoded as JwtPayload | User;
          next();
        }
      }
    );
  }
}

export default new Auth();
