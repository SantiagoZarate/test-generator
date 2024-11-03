import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { useQuery } from '@tanstack/react-query';

export function useGetMultipleChoiceTests() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['multiple-choice-tests'],
    queryFn: multipleChoiceTestAPI.getAll,
  });

  return {
    data,
    isError,
    isLoading,
  };
}
