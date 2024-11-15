import { HomeCard } from '@/components/ui/HomeCard';
import { homePageLinks } from '../../data/home-page-links';

export function HomePage() {
  return (
    <section className="">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {homePageLinks.map((link) => (
          <HomeCard
            key={link.title}
            description={link.description}
            title={link.title}
            href={link.path}
            draw={link.draw}
          />
        ))}
      </ul>
    </section>
  );
}
