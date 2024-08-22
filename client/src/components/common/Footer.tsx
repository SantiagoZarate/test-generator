import { SparkelIcon } from "../icons/SparkelIcon";
import { FooterForm } from "./FooterForm";

export function Footer() {
  return (
    <footer className="print:hidden border-t border-neutral-600 pt-6 pb-20 flex items-start">
      <section className="flex-1 flex gap-1 items-center text-neutral-400">
        <SparkelIcon />
        made by{" "}
        <a
          target="_blank"
          className="hover:underline text-neutral-200"
          href="https://www.github.com/SantiagoZarate"
        >
          Santiago Zarate
        </a>{" "}
        powered by Vite
      </section>
      <FooterForm />
    </footer>
  );
}
