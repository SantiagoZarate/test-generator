import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRouter = Router({ strict: true });

authRouter.post('/register', authController.register);

export default authRouter;
