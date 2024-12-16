import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRouteLayout() {
  const { isLogged } = useAuth();

  if (!isLogged) {
    toast({
      title: 'User not logged in',
      description: 'You must be logged in to access to that page',
    });
    return <Navigate to={'/auth/login'} />;
  }

  return <Outlet />;
}
