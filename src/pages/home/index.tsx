import { ArrowTopRIghtIcon } from "../../components/icons/ArrowTopRIghtIcon";
import { homePageLinks } from "../../constants/home-page-links";

export function HomePage() {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {homePageLinks.map((link) => (
        <li className="" key={link.title}>
          <a
            href={link.path}
            className="rounded-md bg-neutral-800 border border-neutral-600 hover:bg-neutral-900 transition flex flex-col gap-2 p-4 group"
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
