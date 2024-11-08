import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '../../icons/AcademicCapIcon';
import { ThemeSwitcher } from '../ThemeSwitcher';
import './header.css';
import { LoginButon } from './LoginButon';
import { Navbar } from './NavBar';
import { RegisterButton } from './RegisterButton';

export function Header() {
  const { isLogged, user, logout } = useAuth();

  return (
    <header className="header fixed top-0 z-50 w-full px-4 py-2 print:hidden">
      <section className="mx-auto flex w-full max-w-screen-lg justify-between">
        <section className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 divide-x p-2">
            <AcademicCapIcon />
            <p className="px-2 font-semibold capitalize">Test Builder</p>
          </Link>
          <Navbar />
        </section>
        <section className="flex gap-4">
          <ThemeSwitcher />
          <section className="flex items-center gap-2">
            {isLogged ? (
              <>
                <p>{user?.name}</p>
                <Button onClick={logout}>logout</Button>
              </>
            ) : (
              <>
                <RegisterButton />
                <LoginButon />
              </>
            )}
          </section>
        </section>
      </section>
    </header>
  );
}
