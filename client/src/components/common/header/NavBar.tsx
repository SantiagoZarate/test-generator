import { Link, useLocation } from 'react-router-dom';

const NAVBAR_LINKS = [
  {
    value: 'browse',
    path: '/browse/test',
  },
  {
    value: 'about',
    path: '/about',
  },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="flex gap-4">
      {NAVBAR_LINKS.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`transition hover:translate-y-[-2px] ${
            pathname.includes(link.value)
              ? 'font-semibold opacity-100'
              : 'opacity-40'
          }`}
        >
          {link.value}
        </Link>
      ))}
    </nav>
  );
}
