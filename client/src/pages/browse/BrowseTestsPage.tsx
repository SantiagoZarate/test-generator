import { useGetTests } from '@/hooks/useGetTests';
import { BrowseList } from './BrowseList';

export function BrowseTestsPage() {
  const { data, isError, isLoading } = useGetTests();

  return (
    <section>
      {isError && <div>There was an error</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && <BrowseList tests={data ?? []} />}
    </section>
  );
}
