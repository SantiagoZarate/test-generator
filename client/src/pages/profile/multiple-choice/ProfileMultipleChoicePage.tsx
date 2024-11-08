import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export function ProfileMultipleChoicePage() {
  const { id } = useParams();
  const redirect = useNavigate();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['multiple-choice', id],
    queryFn: () => multipleChoiceTestAPI.getOne(id!),
  });

  const handleDelete = () => {
    multipleChoiceTestAPI.delete(id!).then(() => {
      toast({ title: 'Test deleted succesfully' });
      redirect('/profile');
    });
  };

  // Render:
  // Amount of right and wrong answers
  // Delete option

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (isError) {
    return <section>There was an error...</section>;
  }

  return (
    <section>
      <header>
        <Text>{data?.title}</Text>
      </header>
      <Button onClick={() => handleDelete()}>Delete test</Button>
    </section>
  );
}
