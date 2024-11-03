import { testAPI } from '@/api/test/test.api';
import { useQuery } from '@tanstack/react-query';

export function useGetTests() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['tests'],
    queryFn: testAPI.getAll,
  });

  return {
    data,
    isError,
    isLoading,
  };
}
