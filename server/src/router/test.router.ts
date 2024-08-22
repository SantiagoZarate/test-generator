import { Router } from "express";
import { testController as controller } from "../controllers/test.controller";
import { validateData } from "../middlewares/schemaValidations";
import { testSchemaValidation } from "../lib/zod-schemas/test.validation";

const router = Router();

router.get("/:id", controller.getOne);
router.post("/", validateData(testSchemaValidation), controller.create);

export default router;
