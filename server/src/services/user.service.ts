import { compare } from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { ScopeData } from '../types/auth/scopeData.types';
import { UserSelect } from '../types/user.types';
import { BadRequestError, UnauthorizedError } from '../utils/errors';

interface RegisterPayload extends LoginPayload {
  username: string;
}

interface LoginPayload {
  password: string;
  email: string;
}

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

  async registerWithPassword(payload: RegisterPayload) {
    const userWithSameUsername = await userRepository.getByEmail(payload.email);

    if (userWithSameUsername) {
      throw new BadRequestError('User is already registered');
    }

    // const hashedPassword = await hash(payload.password, 8);

    // TODO - Add password to user entity
    const result = await userRepository.create({
      email: payload.email,
      name: payload.username,
    });

    return result;
  }

  async loginWithPassword(payload: LoginPayload) {
    const user = await userRepository.getByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedError('User is not registered');
    }

    // TODO - Add password to user entity
    const hasSamePassword = compare(payload.password, user.name);

    if (!hasSamePassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    return user;
  }

  async login(data: ScopeData) {
    const user = await userRepository.getByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('User is not registered');
    }

    return user;
  }

  async getUser({ id }: UserSelect) {
    const user = await userRepository.getById({ id });
    return user;
  }

  async getUserProfile({ id }: UserSelect) {
    const data = await userRepository.getUserProfile({ id });
    return data;
  }
}

export const userService = new UserService();
