import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { checkCode } from '../middlewares/auth/checkCode';
import { validateToken } from '../middlewares/validateToken';

const authRouter = Router({ strict: true });

authRouter.post('/register', checkCode, authController.register);
authRouter.post('/login', checkCode, authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/me', validateToken, authController.getUser);

export default authRouter;
