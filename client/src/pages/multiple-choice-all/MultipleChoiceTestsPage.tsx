import { useGetMultipleChoiceTests } from '@/hooks/useGetMultipleChoiceTetst';

export function MultipleChoiceTestsPage() {
  const { data, isError, isLoading } = useGetMultipleChoiceTests();

  return (
    <section>
      {isError && <div>There was an error</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul className="flex flex-col divide-y divide-border">
          {data?.map((test) => (
            <li className="py-1" key={test.id}>
              <section className="flex items-center justify-between rounded-lg p-1 px-2 transition hover:bg-border">
                <p>{test.title}</p>
                <p>{test.questionsCounts} questions</p>
              </section>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
