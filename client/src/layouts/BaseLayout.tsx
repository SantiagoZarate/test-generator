import { Header } from '@/components/common/header/Header';
import { Toaster } from '@/components/ui/toaster';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export function BaseLayout() {
  return (
    <>
      <section className="relative flex size-full flex-col text-pretty bg-background font-dmsans text-primary antialiased">
        <Header />
        <section className="mx-auto min-h-dvh w-full">
          <Outlet />
        </section>
        <Toaster />
      </section>
      <ScrollRestoration />
    </>
  );
}
