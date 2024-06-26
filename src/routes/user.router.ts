import { Router, json } from 'express';
import userControllers from '../controllers/user.controllers';
import authMiddleware from '../middleware/auth.middleware';
import { uploadFields } from '../middleware/upload.middleware';

export const routerUser: Router = Router();

routerUser.use(json());
routerUser
  .route('/api/get_user')
  .get(authMiddleware.ValidateUser, userControllers.getUser);
routerUser.route('/api/register').post(userControllers.register);
routerUser.route('/api/login').post(userControllers.login);
routerUser.route('/api/logout').post(userControllers.logout);
routerUser
  .route('/api/users/update_profile/:id')
  .put(authMiddleware.ValidateUser, userControllers.updateProfile);
routerUser
  .route('/api/users/update_avatar/:id')
  .put(authMiddleware.ValidateUser, uploadFields, userControllers.updateAvatar);
routerUser
  .route('/api/users/change_password/:id')
  .put(authMiddleware.ValidateUser, userControllers.changePassword);
