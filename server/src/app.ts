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
import { healthcheck } from './utils/healthcheck';
import { redirectToDocs } from './utils/redirectToDocs';

const app = express();

setBaseMiddleware(app);

// Handlers
app.get('/', redirectToDocs);
app.get('/health', healthcheck);
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);
app.use('/api/user', userRouter);
app.use('/api/multiple-choice-test', multipleChoiceTestRouter);
app.use(
  '/api/docs',
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
