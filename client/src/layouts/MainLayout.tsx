import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Hero } from '../components/common/Hero';
import { Footer } from '../components/common/Footer';
import { Toaster } from '@/components/ui/toaster';

export function MainLayout() {
  return (
    <section className="font-geist relative flex size-full flex-col bg-background text-primary">
      <Header />
      <Toaster />
      <section className="mx-auto grid min-h-screen w-full max-w-screen-lg grid-rows-[1fr_auto]">
        <section>
          <Hero />
          <main className="mx-auto flex w-full flex-col gap-12 px-4 pb-12">
            <Outlet />
          </main>
        </section>
        <Footer />
      </section>
    </section>
  );
}
