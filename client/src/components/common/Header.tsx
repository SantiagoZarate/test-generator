import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '../icons/AcademicCapIcon';
import './header.css';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  return (
    <header className="header fixed top-0 z-50 w-full py-2 print:hidden">
      <section className="mx-auto flex w-full max-w-screen-lg justify-between">
        <Link to="/" className="flex items-center gap-2 divide-x p-2">
          <AcademicCapIcon />
          <p className="px-2 font-semibold capitalize">Test Builder</p>
        </Link>
        <ThemeSwitcher />
      </section>
    </header>
  );
}
