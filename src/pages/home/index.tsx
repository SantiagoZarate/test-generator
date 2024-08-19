import { ArrowTopRIghtIcon } from "../../components/icons/ArrowTopRIghtIcon";
import { GridGradientBackground } from "../../components/ui/GridGradientBackground";
import { homePageLinks } from "../../constants/home-page-links";

export function HomePage() {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {homePageLinks.map((link) => (
        <li
          className="relative border border-neutral-600 rounded-md overflow-hidden group/grid bg-neutral-800 hover:bg-neutral-900 transition"
          key={link.title}
        >
          <GridGradientBackground className="group-hover/grid:saturate-100" />
          <a
            href={link.path}
            className="relative z-10 overflow-hidden flex flex-col gap-2 p-4 group"
          >
            <header className="flex gap-2">
              <h2 className="font-bold capitalize">{link.title}</h2>
              <span className="group-hover:translate-x-1  p-1 group-hover:-translate-y-1 transition">
                <ArrowTopRIghtIcon />
              </span>
            </header>
            <p className="text-neutral-400">{link.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
