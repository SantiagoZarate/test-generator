import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export function AuthSection() {
  const { isLogged, user, logout } = useAuth();

  return (
    <section className="flex items-center gap-2">
      {isLogged ? (
        <>
          <Link to="/profile">{user?.name}</Link>
          <Button onClick={logout}>logout</Button>
        </>
      ) : (
        <>
          <Link to={'/auth/login'}>
            <Button className="px-6">Login</Button>
          </Link>
        </>
      )}
    </section>
  );
}
