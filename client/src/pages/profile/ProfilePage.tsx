import { userAPI } from '@/api/user/user.api';
import { Text } from '@/components/ui/Text';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-profile'],
    queryFn: userAPI.getUserProfile,
  });

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (isError) {
    return <section>There was an error...</section>;
  }

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h2>
          <Text variant={'title'}>Profile page</Text>
        </h2>
      </header>
      <section className="flex flex-col gap-2">
        <Text>Open ended tests</Text>
        <ul className="grid grid-cols-4 gap-2">
          {data?.tests.map((test) => (
            <li className="rounded-xl border border-border" key={test.id}>
              <Link className="flex p-4" to={'/profile/basic-test/' + test.id}>
                <p>{test.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-2">
        <Text>Multiple choice tests</Text>
        <ul className="grid grid-cols-4 gap-2">
          {data?.multipleChoiceTests.map((test) => (
            <li className="rounded-xl border border-border" key={test.id}>
              <Link
                className="flex p-4"
                to={'/profile/multiple-choice/' + test.id}
              >
                <p>{test.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
