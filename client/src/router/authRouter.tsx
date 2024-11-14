import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginPage } from '@/pages/auth/login/LoginPage';
import { SignUpPage } from '@/pages/auth/signup/SignUpPage';
import { RouteObject } from 'react-router-dom';

const BASE = '/auth';

export const authRouter: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: BASE + '/login',
        element: <LoginPage />,
      },
      {
        path: BASE + '/signup',
        element: <SignUpPage />,
      },
    ],
  },
];
