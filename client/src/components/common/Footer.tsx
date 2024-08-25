import { SparkelIcon } from '../icons/SparkelIcon';
import { FooterForm } from './FooterForm';

export function Footer() {
  return (
    <footer className="flex items-start border-t border-neutral-600 pb-20 pt-6 print:hidden">
      <section className="flex flex-1 items-center gap-1 text-neutral-400">
        <SparkelIcon />
        made by{' '}
        <a
          target="_blank"
          className="text-neutral-200 hover:underline"
          href="https://www.github.com/SantiagoZarate"
        >
          Santiago Zarate
        </a>{' '}
        powered by Vite
      </section>
      <FooterForm />
    </footer>
  );
}
