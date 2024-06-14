import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/user.model';

declare global {
  namespace Express {
    interface Request {
      decoded?: JwtPayload | User;
    }
  }
}
