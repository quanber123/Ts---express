import { Router, json } from 'express';
import validateMiddleware from '../middleware/validate.middleware';
import validate from '../utils/validate';
import tagControllers from '../controllers/tag.controllers';
import authMiddleware from '../middleware/auth.middleware';

export const routerTag: Router = Router();

routerTag.use(json());
routerTag
  .route('/api/tags')
  .get(tagControllers.getTags)
  .post(
    validate.tagValidateRules(),
    validateMiddleware.validateMiddleware,
    authMiddleware.ValidateUser,
    tagControllers.createTag
  );
routerTag
  .route('/api/tags/:id')
  .put(
    validate.tagValidateRules(),
    validateMiddleware.validateMiddleware,
    authMiddleware.ValidateUser,
    tagControllers.updateTag
  )
  .delete(authMiddleware.ValidateUser, tagControllers.deleteTag);
