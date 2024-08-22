import { AcademicCapIcon } from "../icons/AcademicCapIcon";
import "./header.css";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  return (
    <header className="header fixed top-0 print:hidden w-full py-2">
      <section className="w-full max-w-screen-lg mx-auto flex justify-between">
        <a href="/" className="flex divide-x gap-2 items-center p-2">
          <AcademicCapIcon />
          <p className="font-semibold capitalize px-2">Test Builder</p>
        </a>
        <ThemeSwitcher />
      </section>
    </header>
  );
}
