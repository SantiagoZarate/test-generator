import { Router } from "express";
import { testController as controller } from "../controllers/test.controller";
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
