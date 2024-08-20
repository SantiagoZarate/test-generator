import { Card } from "../../components/ui/Card";
import { homePageLinks } from "../../constants/home-page-links";

export function HomePage() {
  return (
    <section className="grid grid-rows-[1fr_auto] h-full gap-4">
      <ul className="grid grid-cols-2 gap-4">
        {homePageLinks.map((link) => (
          <Card
            key={link.title}
            description={link.description}
            title={link.title}
            href={link.path}
          />
        ))}
      </ul>
    </section>
  );
}
