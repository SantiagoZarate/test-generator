import { Request } from 'express';

export interface UserData {
  id: string;
}

export interface AuthRequest extends Request {
  user?: UserData; // Or a specific type if you know the structure
}
