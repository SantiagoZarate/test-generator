import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Hero } from "../components/common/Hero";
import { Footer } from "../components/common/Footer";

export function MainLayout() {
  return (
    <section className="relative h-full w-full flex flex-col bg-neutral-900 text-neutral-200  font-geist">
      <Header />
      <section className="max-w-screen-lg w-full mx-auto grid grid-rows-[1fr_auto] min-h-screen">
        <section>
          <Hero />
          <main className="mx-auto flex flex-col gap-12 w-full pb-12 px-4">
            <Outlet />
          </main>
        </section>
        <Footer />
      </section>
    </section>
  );
}
