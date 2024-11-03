import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '../icons/AcademicCapIcon';
import './header.css';
import { ThemeSwitcher } from './ThemeSwitcher';

const NAVBAR_LINKS = [
  {
    value: 'browse',
    path: '/browse',
  },
];

export function Header() {
  return (
    <header className="header fixed top-0 z-50 w-full px-4 py-2 print:hidden">
      <section className="mx-auto flex w-full max-w-screen-lg justify-between">
        <section className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 divide-x p-2">
            <AcademicCapIcon />
            <p className="px-2 font-semibold capitalize">Test Builder</p>
          </Link>
          <nav className="flex gap-2">
            {NAVBAR_LINKS.map((link) => (
              <Link to={link.path}>{link.value}</Link>
            ))}
          </nav>
        </section>
        <ThemeSwitcher />
      </section>
    </header>
  );
}
