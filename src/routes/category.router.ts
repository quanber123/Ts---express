import { Router, json } from 'express';
import validateMiddleware from '../middleware/validate.middleware';
import validate from '../utils/validate';
import categoryControllers from '../controllers/category.controllers';

export const routerCategory: Router = Router();

routerCategory.use(json());
routerCategory
  .route('/api/categories')
  .get(categoryControllers.getCategories)
  .post(
    validate.categoryValidateRules,
    validateMiddleware.validateMiddleware,
    categoryControllers.getCategories
  );
routerCategory
  .route('/api/categories/:id')
  .put(
    validate.categoryValidateRules,
    validateMiddleware.validateMiddleware,
    categoryControllers.updateCategory
  )
  .delete(categoryControllers.deleteCategory);
