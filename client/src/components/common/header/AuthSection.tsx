import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { LoginButon } from './LoginButon';
import { RegisterButton } from './RegisterButton';

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
          <RegisterButton />
          <LoginButon />
        </>
      )}
    </section>
  );
}
