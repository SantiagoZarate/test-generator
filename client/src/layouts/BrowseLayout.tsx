import { Outlet } from 'react-router-dom';
import { TestsTab } from './TestsTab';

export function BrowseLayout() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col items-center sm:flex sm:flex-row sm:items-center sm:justify-between">
        <p>Browse over the lasts users tests</p>
        <TestsTab />
      </header>
      <Outlet />
    </section>
  );
}
