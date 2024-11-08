import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validateToken } from '../middlewares/validateToken';

const userRouter = Router();

userRouter.get('/profile', validateToken, userController.getUserProfile);

export default userRouter;
