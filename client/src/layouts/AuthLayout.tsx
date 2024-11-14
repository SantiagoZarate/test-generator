import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <section className="mx-auto flex h-full min-h-screen max-w-screen-lg pt-12">
      <section className="hidden flex-1 items-center sm:flex">
        <figure>
          <img
            src="https://static.vecteezy.com/system/resources/previews/046/787/878/non_2x/book-with-pen-3d-render-free-png.png"
            alt=""
          />
        </figure>
      </section>
      <section className="flex-1">
        <Outlet />
      </section>
    </section>
  );
}
