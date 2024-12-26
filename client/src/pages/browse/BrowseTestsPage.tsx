import { Button } from '@/components/ui/Button';
import { useGetTests } from '@/hooks/useGetTests';
import { BrowseList } from './BrowseList';
import { NoTestsFound } from './NoTestsFound';
import { TestLoader } from './TestLoader';

export function BrowseTestsPage() {
  const { tests, isError, isLoading, fetchNextPage, hasNextPage } =
    useGetTests();

  return (
    <section>
      {isError && <div>There was an error</div>}
      {isLoading && <TestLoader />}
      {!isLoading && !isError && tests.length === 0 && <NoTestsFound />}
      {!isLoading && !isError && (
        <section className="flex flex-col">
          <BrowseList tests={tests ?? []} typeOfTest="/basic-test/" />
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>load more</Button>
          )}
        </section>
      )}
    </section>
  );
}
