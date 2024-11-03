import { useGetMultipleChoiceTests } from '@/hooks/useGetMultipleChoiceTetst';
import { BrowseList } from './BrowseList';

export function BrowseMultipleChoiceTestsPage() {
  const { data, isError, isLoading } = useGetMultipleChoiceTests();

  return (
    <section>
      {isError && <div>There was an error</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && <BrowseList tests={data ?? []} />}
    </section>
  );
}
