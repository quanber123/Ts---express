import { Router, json } from 'express';
import userControllers from '../controllers/user.controllers';
import authMiddleware from '../middleware/auth.middleware';

export const routerUser: Router = Router();

routerUser.use(json());
routerUser
  .route('/api/get_user')
  .get(authMiddleware.ValidateUser, userControllers.getUser);
routerUser.route('/api/register').post(userControllers.register);
routerUser.route('/api/login').post(userControllers.login);
