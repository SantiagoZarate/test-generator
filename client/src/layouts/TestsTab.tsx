import { Link, useLocation } from 'react-router-dom';

const TESTS_TAB = [
  {
    value: 'Regular Test',
    path: '/browse/test',
  },
  {
    value: 'Multiple Choice',
    path: '/browse/multiple-choice-test',
  },
];

export function TestsTab() {
  const { pathname } = useLocation();

  return (
    <section className="flex gap-1">
      {TESTS_TAB.map((tab) => (
        <Link
          className={`rounded-md border border-border px-4 py-1 text-xs transition ${pathname === tab.path && 'bg-foreground text-background'}`}
          key={tab.path}
          to={tab.path}
        >
          {tab.value}
        </Link>
      ))}
    </section>
  );
}
