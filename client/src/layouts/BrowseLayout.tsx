import { Outlet } from 'react-router-dom';
import { TestsTab } from './TestsTab';

export function BrowseLayout() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <p>Browse over the lasts users tests</p>
        <TestsTab />
      </header>
      <Outlet />
    </section>
  );
}
