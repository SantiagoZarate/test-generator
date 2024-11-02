import express from "express";
import "express-async-errors";
// Configs
import { envs } from "../config/envs";
import { swaggerSpecs, swaggerUi } from "../config/swagger";
// Middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { setMiddleware } from "./middlewares/setMiddleware";
// Routes
import multipleChoiceTestRouter from "./router/multipleChoiceTest.router";
import testRouter from "./router/test.router";
import { healthcheck } from "./utils/healthcheck";
import { redirectToDocs } from "./utils/redirectToDocs";

const app = express();

setMiddleware(app);

// Handlers
app.get("/", redirectToDocs);
app.get("/health", healthcheck);
app.use("/api/tests", testRouter);
app.use("/api/multiple-choice-tests", multipleChoiceTestRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(errorMiddleware);

export const start = () => {
  app.listen(envs.PORT, () => {
    console.log(`Server running on http://localhost:${envs.PORT ?? 3000}`);
  });
};

export default app;
