import { Router } from "express";
import { multipleChoiceTestController as controller } from "../controllers/multipleChoiceTest.controller";
import { multipleChoiceTestSchemaValidation } from "../lib/zod-schemas/multipleChoiceTest.validation";
import { validateData } from "../middlewares/schemaValidations";

const router = Router();

router.get("/:id", controller.getOne);
router.post(
  "/",
  validateData(multipleChoiceTestSchemaValidation),
  controller.create
);

export default router;
