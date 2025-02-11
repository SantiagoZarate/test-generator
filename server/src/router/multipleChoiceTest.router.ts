import { Router } from 'express';
import { multipleChoiceTestController as controller } from '../controllers/multipleChoiceTest.controller';
import { multipleChoiceTestSchemaValidation } from '../lib/zod-schemas/multipleChoiceTest.validation';
import { validateData } from '../middlewares/schemaValidations';
import { validateToken } from '../middlewares/validateToken';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/:id/info', controller.getOneWithInfo);
router.delete('/:id', validateToken, controller.delete);
router.post(
  '/',
  validateToken,
  validateData(multipleChoiceTestSchemaValidation),
  controller.create,
);
router.post('/:id/result', controller.postResult);

export default router;
