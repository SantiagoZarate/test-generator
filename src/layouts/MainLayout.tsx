import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <section className="w-full flex flex-col bg-neutral-900 text-neutral-200 min-h-screen">
      <header className="print:hidden max-w-screen-xl mx-auto flex flex-col gap-2 py-24 items-center justify-center">
        <h1 className="text-6xl font-bold">Test generator</h1>
        <p>
          Generate multiple tests from a batch of question! it's never been this
          easy
        </p>
      </header>
      <main className="max-w-screen-lg mx-auto flex flex-col gap-12 w-full pb-12">
        <Outlet />
      </main>
    </section>
  );
}
