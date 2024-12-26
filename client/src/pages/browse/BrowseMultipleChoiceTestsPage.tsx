import { Button } from '@/components/ui/Button';
import { useGetMultipleChoiceTests } from '@/hooks/useGetMultipleChoiceTetst';
import { BrowseList } from './BrowseList';
import { NoTestsFound } from './NoTestsFound';
import { TestLoader } from './TestLoader';

export function BrowseMultipleChoiceTestsPage() {
  const { tests, isError, isLoading, fetchNextPage, hasNextPage } =
    useGetMultipleChoiceTests();

  return (
    <section>
      {isError && <div>There was an error</div>}
      {isLoading && <TestLoader />}
      {!isLoading && tests.length === 0 && <NoTestsFound />}
      {!isLoading && (
        <section className="flex flex-col">
          <BrowseList tests={tests ?? []} typeOfTest="/multiple-choice/" />
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()}>load more</Button>
          )}
        </section>
      )}
    </section>
  );
}
