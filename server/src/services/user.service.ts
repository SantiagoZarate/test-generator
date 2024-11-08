import { userRepository } from '../repositories/user.repository';
import { ScopeData } from '../types/auth/scopeData.types';
import { BadRequestError, UnauthorizedError } from '../utils/errors';

class UserService {
  async register(data: ScopeData) {
    const user = await userRepository.getByEmail(data.email);

    if (user) {
      throw new BadRequestError('User is already registered');
    }

    const result = await userRepository.create({
      email: data.email,
      name: data.name,
    });

    return result;
  }

  async login(data: ScopeData) {
    const user = await userRepository.getByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('User is not registered');
    }

    return user;
  }
}

export const userService = new UserService();
