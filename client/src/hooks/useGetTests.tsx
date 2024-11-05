import { testAPI } from '@/api/test/test.api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetTests() {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['tests'],
      queryFn: ({ pageParam }) => testAPI.getAll({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.info;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  console.log(data?.pages);

  const tests = data?.pages.flatMap((page) => page.tests) ?? [];

  return {
    tests,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
}
