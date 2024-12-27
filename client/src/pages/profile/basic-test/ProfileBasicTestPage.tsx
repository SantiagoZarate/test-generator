import { testAPI } from '@/api/test/test.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function ProfileBasicTestPage() {
  const { id } = useParams();
  const {
    data: test,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile-basic-test', id],
    queryFn: () => testAPI.getByIdWithInfo({ id: id! }),
  });

  if (isLoading) {
    return <p>is loading...</p>;
  }

  if (isError) {
    return <p>there was an error, try again later!</p>;
  }

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h2>{test?.title}</h2>
      </header>
    </section>
  );
}
