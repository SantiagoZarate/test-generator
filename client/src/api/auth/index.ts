import { User } from '@/context/authContext';
import { LoginSchema } from '@/pages/auth/login/LoginForm';

export interface AuthAPI {
  googleRegister: (code: string) => Promise<unknown>;
  googleLogin: (code: string) => Promise<unknown>;
  register: () => Promise<unknown>;
  login: (data: LoginSchema) => Promise<unknown>;
  getUser: () => Promise<User>;
  logout: () => Promise<void>;
}
