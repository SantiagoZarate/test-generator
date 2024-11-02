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
        <h1 className="text-2xl font-semibold">{data?.title}</h1>
      </header>
      <section>
        {data?.questions.map((question, index) => (
          <article>
            <p>{question.content}</p>
            <ul className="flex flex-col">
              {question.options.map((option) => (
                <label
                  key={option.order}
                  htmlFor={`${index}-option-${option.order}`}
                  className="cursor-pointer p-2 transition hover:bg-border"
                >
                  <input
                    id={`${index}-option-${option.order}`}
                    name={`question-${index}`}
                    type="radio"
                  />
                  {option.content}
                </label>
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
