import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Hero } from '../components/common/Hero';
import { Footer } from '../components/common/Footer';
import { Toaster } from '@/components/ui/toaster';

export function MainLayout() {
  return (
    <section className="relative flex size-full flex-col text-pretty bg-background font-dmsans text-primary antialiased">
      <Header />
      <section className="mx-auto grid min-h-screen w-full grid-rows-[auto_1fr_auto] gap-8">
        <Hero />
        <main className="mx-auto flex w-full max-w-screen-lg flex-col gap-12 px-4 pb-12">
          <Outlet />
        </main>
        <Footer />
      </section>
      <Toaster />
    </section>
  );
}
