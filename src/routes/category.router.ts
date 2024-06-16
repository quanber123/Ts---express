import { Router, json } from 'express';
import validateMiddleware from '../middleware/validate.middleware';
import validate from '../utils/validate';
import categoryControllers from '../controllers/category.controllers';
import authMiddleware from '../middleware/auth.middleware';

export const routerCategory: Router = Router();

routerCategory.use(json());
routerCategory
  .route('/api/categories')
  .get(categoryControllers.getCategories)
  .post(
    validate.categoryValidateRules(),
    validateMiddleware.validateMiddleware,
    authMiddleware.ValidateUser,
    categoryControllers.createCategory
  );
routerCategory
  .route('/api/categories/:id')
  .put(
    validate.categoryValidateRules(),
    validateMiddleware.validateMiddleware,
    authMiddleware.ValidateUser,
    categoryControllers.updateCategory
  )
  .delete(authMiddleware.ValidateUser, categoryControllers.deleteCategory);
