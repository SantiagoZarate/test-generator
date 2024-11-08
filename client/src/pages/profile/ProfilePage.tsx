import { userAPI } from '@/api/user/user.api';
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
    <section>
      <header>Profile Page</header>
      <ul className="grid grid-cols-4 gap-2">
        {data?.multipleChoiceTests.map((test) => (
          <li key={test.id}>
            <Link
              className="flex border border-border p-4"
              to={'/multiple-choice/' + test.id}
            >
              <p>{test.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
