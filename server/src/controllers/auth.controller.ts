import { Request, Response } from 'express';
import { BadRequestError } from '../utils/errors';

class AuthController {
  async register(req: Request, res: Response) {
    const { code } = req.query;

    if (!code) {
      throw new BadRequestError('Code must be provided');
    }

    res.json({
      message: 'user created succesfully',
      code,
    });
  }

  async login() {
    throw new Error('Not implemented yet');
  }

  async logout() {
    throw new Error('Not implemented yet');
  }
}

export const authController = new AuthController();
