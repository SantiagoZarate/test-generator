import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetMultipleChoiceTests() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['multiple-choice-tests'],
      queryFn: ({ pageParam }) =>
        multipleChoiceTestAPI.getAll({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.info;
        return currentPage < totalPages ? lastPage.nextPage : undefined;
      },
    });

  const tests = data?.pages.flatMap((p) => p.tests) ?? [];

  return {
    tests,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
