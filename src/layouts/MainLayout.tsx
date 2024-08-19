import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Hero } from "../components/common/Hero";

export function MainLayout() {
  return (
    <section className="relative h-full w-full flex flex-col bg-neutral-900 text-neutral-200 min-h-screen font-geist">
      <Header />
      <Hero />
      <main className="max-w-screen-lg mx-auto flex flex-col gap-12 w-full pb-12 px-4">
        <Outlet />
      </main>
    </section>
  );
}
