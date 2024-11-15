import { InformationMiniIcon } from '@/components/icons/InformationMiniIcon';
import { Text } from '@/components/ui/Text';
import { Outlet } from 'react-router-dom';

const BENEFITS = [
  {
    title: 'Share Tests with Others',
    description:
      'Share your tests with students, colleagues, or friends through a simple link or invite system.',
  },
  {
    title: 'Access from Anywhere',
    description:
      'Log in to access your tests and questions from any device, ensuring your work is always with you.',
  },
];

export function AuthLayout() {
  return (
    <section className="mx-auto flex h-full min-h-screen max-w-screen-lg pt-12">
      <section className="hidden flex-1 flex-col items-center justify-center gap-8 sm:flex">
        <figure>
          <img
            src="https://static.vecteezy.com/system/resources/previews/046/787/878/non_2x/book-with-pen-3d-render-free-png.png"
            alt=""
          />
        </figure>
        <footer className="flex items-center gap-4 rounded-md border border-dashed bg-input p-4">
          <span>
            <InformationMiniIcon />
          </span>
          <ul className="flex flex-col gap-2">
            {BENEFITS.map((b) => (
              <li className="flex flex-col gap-1">
                <Text className="font-semibold">{b.title}</Text>
                <Text className="text-xs">{b.description}</Text>
              </li>
            ))}
          </ul>
        </footer>
      </section>
      <section className="flex-1">
        <Outlet />
      </section>
    </section>
  );
}
