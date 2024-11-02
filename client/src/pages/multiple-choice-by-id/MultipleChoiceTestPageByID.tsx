import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function MultipleChoiceTestPageByID() {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['multiple-choice-test'],
    queryFn: () => multipleChoiceTestAPI.getOne(id!),
  });

  return (
    <section>
      <header>
        <h1>{data?.title}</h1>
      </header>
      <section>
        {data?.questions.map((question) => (
          <article>
            <p>{question.content}</p>
            <ul className="flex flex-col gap-2 rounded-xl border border-border p-4">
              {question.options.map((option, idx) => (
                <li key={idx}>{option.content}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      {isError && <div>There was an error...</div>}
      {isLoading && <div>is loading...</div>}
    </section>
  );
}
