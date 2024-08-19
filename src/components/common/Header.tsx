import { AcademicCapIcon } from "../icons/AcademicCapIcon";

export function Header() {
  return (
    <header className="fixed top-0 print:hidden w-full">
      <section className="w-full max-w-screen-lg mx-auto">
        <a href="/" className="flex divide-x gap-2 items-center p-2">
          <AcademicCapIcon />
          <p className="font-semibold capitalize px-2">Test Builder</p>
        </a>
      </section>
    </header>
  );
}
