import express from 'express';
import 'express-async-errors';
// Configs
import { envs } from '../config/envs';
import { swaggerSpecs, swaggerUi, SwaggerUiOptions } from '../config/swagger';
// Middlewares
import { errorMiddleware } from './middlewares/errorMiddleware';
import { setBaseMiddleware } from './middlewares/setMiddleware';
// Routes
import chalk from 'chalk';
import authRouter from './router/auth.router';
import multipleChoiceTestRouter from './router/multipleChoiceTest.router';
import testRouter from './router/test.router';
import userRouter from './router/user.router';
import { appRoutes } from './types/appRoutes.types';
import { healthcheck } from './utils/healthcheck';
import { redirectToDocs } from './utils/redirectToDocs';

const app = express();

setBaseMiddleware(app);

// Handlers
app.get('/', redirectToDocs);
app.get(appRoutes.health, healthcheck);
app.use(appRoutes.auth, authRouter);
app.use(appRoutes.test, testRouter);
app.use(appRoutes.user, userRouter);
app.use(appRoutes.multipleChoice, multipleChoiceTestRouter);
app.use(
  appRoutes.docs,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, SwaggerUiOptions),
);

app.use(errorMiddleware);

export const start = () => {
  app.listen(envs.PORT, () => {
    console.log(
      chalk.blue(
        `🚀 -- Server running on http://localhost:${envs.PORT ?? 3000}`,
      ),
    );
    console.log(chalk.green(`🚧 -- Mode: ${envs.MODE}`));
  });
};

export default app;
