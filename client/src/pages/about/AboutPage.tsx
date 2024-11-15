import { Text } from '@/components/ui/Text';
// Why Choose Us?
// Our platform is designed with flexibility and simplicity in mind. Whether you're preparing for an exam, conducting classroom assessments, or creating quizzes for fun, [Your Web App Name] empowers you to test, share, and grow.

const WHAT_WE_OFFER = [
  {
    title: 'Test Creation Made Simple',
    description:
      'Craft multiple-choice or open-ended tests with an intuitive interface that caters to your specific needs.',
  },
  {
    title: 'Seamless Sharing',
    description:
      'Share your tests with students, colleagues, or friends with just a few clicks.',
  },
  {
    title: 'Personalized Learning Experience',
    description:
      'Tailor tests to individual or group learning goals for an optimized experience.',
  },
];

export function AboutPage() {
  return (
    <section className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <header>
          <Text variant={'title'}>About Us</Text>
        </header>
        <p className="prose prose-invert text-primary/90">
          Welcome to Test Builder, the ultimate platform for{' '}
          <span className="font-bold">
            creating, sharing, and managing tests!
          </span>{' '}
          Whether you're an educator, a student, or a professional looking to
          share knowledge, our web app makes it easy to create engaging
          multiple-choice tests and thought-provoking open-ended tests.
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <Text variant={'title'}>What We Offer</Text>
        <ul className="flex flex-col gap-4">
          {WHAT_WE_OFFER.map((p) => (
            <li className="flex flex-col gap-1">
              <Text className="font-semibold">{p.title}</Text>
              <p className="opacity-45">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
