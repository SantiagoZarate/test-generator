import { testAPI } from '@/api/test/test.api';
import { Item } from '@/components/ui/Item';
import { List } from '@/components/ui/List';
import { PrintButton } from '@/components/ui/PrintButton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function BasicTestByIdPage() {
  const { id } = useParams();

  const {
    data: test,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['basic-test', id],
    queryFn: () => testAPI.getById({ id: id! }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>There was an error, try again later!</p>;
  }

  return (
    <>
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{test?.title}</h2>
        <p>{test?.created_at}</p>
      </header>
      <List>{test?.questions.map((q) => <Item>{q}</Item>)}</List>
      <footer className="flex justify-end print:hidden">
        <PrintButton />
      </footer>
    </>
  );
}
