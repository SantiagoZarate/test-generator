import { ArrowTopRIghtIcon } from "../icons/ArrowTopRIghtIcon";
import { GridGradientBackground } from "./GridGradientBackground";

interface Props {
  title: string;
  description: string;
  href?: string;
}

export function Card({ description, title, href }: Props) {
  return (
    <li className="relative border border-border rounded-md overflow-hidden group/grid bg-card hover:bg-background transition">
      <GridGradientBackground className="group-hover/grid:saturate-100" />
      <a
        href={href}
        className="relative z-10 overflow-hidden flex flex-col gap-2 p-4 group"
      >
        <header className="flex gap-2">
          <h2 className="font-bold capitalize">{title}</h2>
          <span className="group-hover:translate-x-1  p-1 group-hover:-translate-y-1 transition">
            <ArrowTopRIghtIcon />
          </span>
        </header>
        <p className="text-neutral-400">{description}</p>
      </a>
    </li>
  );
}
