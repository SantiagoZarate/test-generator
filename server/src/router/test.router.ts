import { Router } from 'express';
import { testController as controller } from '../controllers/test.controller';
import { testSchemaValidation } from '../lib/zod-schemas/test.validation';
import { validateData } from '../middlewares/schemaValidations';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', validateData(testSchemaValidation), controller.create);

export default router;
