import { Link, Outlet } from 'react-router-dom';

export function BrowseLayout() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <p>Browse over the lasts users tests</p>
        <section className="flex gap-4">
          <Link to={'/browse/test'}>Regular Test</Link>
          <Link to={'/browse/multiple-choice-test'}>Multiple Choice</Link>
        </section>
      </header>
      <Outlet />
    </section>
  );
}
