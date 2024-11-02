import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function MultipleChoiceTestPageByID() {
  const { id } = useParams();

  const { isLoading, isError } = useQuery({
    queryKey: ['multiple-choice-test'],
    queryFn: () => multipleChoiceTestAPI.getOne(id!),
  });

  return (
    <section>
      {isError && <div>There was an error...</div>}
      {isLoading && <div>is loading...</div>}
    </section>
  );
}
