import { Router } from "express";
import { testController as controller } from "../controllers/test.controller";

const router = Router();

router.get("/:id", controller.getOne);

export default router;
