import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric');

export const loginValidation = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const registerValidation = loginValidation
  .extend({
    username: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'password must be confirmed',
    path: ['confirmPassword'],
  });
