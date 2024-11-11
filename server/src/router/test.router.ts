import { Router } from 'express';
import { testController as controller } from '../controllers/test.controller';
import { testSchemaValidation } from '../lib/zod-schemas/test.validation';
import { validateData } from '../middlewares/schemaValidations';
import { validateToken } from '../middlewares/validateToken';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', validateToken, controller.delete);
router.post(
  '/',
  validateToken,
  validateData(testSchemaValidation),
  controller.create,
);

export default router;
