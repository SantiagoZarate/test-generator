import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import {
  loginValidation,
  registerValidation,
} from '../lib/zod-schemas/auth.validation';
import { checkCode } from '../middlewares/auth/checkCode';
import { validateData } from '../middlewares/schemaValidations';
import { validateToken } from '../middlewares/validateToken';

const authRouter = Router({ strict: true });

// TODO - Add data body validation for register and login endpoints
authRouter.post(
  '/register',
  validateData(registerValidation),
  authController.register,
);
authRouter.post('/login', validateData(loginValidation), authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/me', validateToken, authController.getUser);

// OAUTH Provider
authRouter.post('/google/login', checkCode, authController.googleLogin);

export default authRouter;
