import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthLayout() {
  const { isLogged } = useAuth();

  return isLogged ? <Outlet /> : <Navigate to={'/'} />;
}
