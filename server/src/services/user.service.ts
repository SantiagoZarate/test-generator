import { userRepository } from '../repositories/user.repository';
import { ScopeData } from '../types/auth/scopeData.types';

class UserService {
  async register(data: ScopeData) {
    const result = await userRepository.create({
      email: data.email,
      name: data.name,
    });

    return result;
  }
}

export const userService = new UserService();
