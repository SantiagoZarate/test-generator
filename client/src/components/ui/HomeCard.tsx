import { Link } from 'react-router-dom';
import { ArrowTopRIghtIcon } from '../icons/ArrowTopRIghtIcon';
import { GridGradientBackground } from './GridGradientBackground';

interface Props {
  title: string;
  description: string;
  href: string;
  draw: JSX.Element;
}

export function HomeCard({ description, title, href, draw }: Props) {
  return (
    <li className="group/grid relative overflow-hidden rounded-md border border-border bg-card transition hover:bg-background">
      <GridGradientBackground />
      <Link
        to={href}
        data-testid={`${title}`}
        className="group relative z-10 grid grid-cols-[auto_1fr] divide-x"
      >
        <div className="flex aspect-square items-end justify-center">
          {draw}
        </div>
        <section className="flex flex-col gap-2 p-4">
          <header className="flex gap-2">
            <h2 className="font-bold capitalize">{title}</h2>
            <span className="p-1 transition group-hover:-translate-y-1 group-hover:translate-x-1">
              <ArrowTopRIghtIcon />
            </span>
          </header>
          <p className="text-neutral-400">{description}</p>
        </section>
      </Link>
    </li>
  );
}
