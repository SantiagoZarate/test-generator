import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '../../icons/AcademicCapIcon';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { AuthSection } from './AuthSection';
import './header.css';
import { Navbar } from './NavBar';

export function Header() {
  return (
    <header className="header fixed top-0 z-50 w-full px-4 py-2 print:hidden">
      <section className="mx-auto flex w-full max-w-screen-lg justify-between">
        <section className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 divide-x p-2">
            <AcademicCapIcon />
            <p className="px-2 font-semibold capitalize">Test Builder</p>
          </Link>
          <Navbar />
        </section>
        <section className="flex gap-4">
          <ThemeSwitcher />
          <AuthSection />
        </section>
      </section>
    </header>
  );
}
