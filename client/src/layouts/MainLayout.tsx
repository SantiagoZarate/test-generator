import { Outlet } from 'react-router-dom';
import { Footer } from '../components/common/Footer';
import { Hero } from '../components/common/Hero';

export function MainLayout() {
  return (
    <>
      <section className="grid h-full min-h-dvh grid-rows-[auto_1fr_auto] gap-8">
        <Hero />
        <main className="mx-auto flex w-full max-w-screen-lg flex-col gap-12 px-4 pb-12">
          <Outlet />
        </main>
        <Footer />
      </section>
    </>
  );
}
