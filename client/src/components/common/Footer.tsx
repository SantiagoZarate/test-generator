import { SparkelIcon } from '../icons/SparkelIcon';
import { FooterForm } from './FooterForm';

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center gap-4 border-t border-neutral-600 px-4 pb-20 pt-6 sm:flex-row print:hidden">
      <section className="flex flex-1 items-center gap-1 text-neutral-400">
        <SparkelIcon />
        <p>
          made by{' '}
          <a
            target="_blank"
            className="text-neutral-200 hover:underline"
            href="https://www.github.com/SantiagoZarate"
          >
            Santiago Zarate
          </a>{' '}
          powered by Vite
        </p>
      </section>
      <FooterForm />
    </footer>
  );
}
