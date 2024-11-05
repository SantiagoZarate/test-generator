import { Button } from '@/components/ui/Button';
import { useGetMultipleChoiceTests } from '@/hooks/useGetMultipleChoiceTetst';
import { BrowseList } from './BrowseList';

export function BrowseMultipleChoiceTestsPage() {
  const { tests, isError, isLoading, fetchNextPage, hasNextPage } =
    useGetMultipleChoiceTests();

  return (
    <section>
      {isError && <div>There was an error</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <section className="flex flex-col">
          <BrowseList tests={tests ?? []} />
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>load more</Button>
          )}
        </section>
      )}
    </section>
  );
}
