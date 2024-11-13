import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { toast } from '@/components/ui/use-toast';
import { multipleChoiceTestDetailQuery } from '@/router/profileRouter';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export function ProfileMultipleChoicePage() {
  const { id } = useParams();
  const redirect = useNavigate();

  const { isLoading, data } = useQuery(multipleChoiceTestDetailQuery(id!));

  const handleDelete = () => {
    multipleChoiceTestAPI.delete(id!).then(() => {
      toast({ title: 'Test deleted succesfully' });
      redirect('/profile');
    });
  };

  if (isLoading) {
    return <section>Loading...</section>;
  }

  const totalAttempts =
    data!.info.countAprovedTests + data!.info.countDisaprovedTests;

  return (
    <section>
      <header>
        <Text>{data?.title}</Text>
      </header>
      <section className="grid grid-cols-4 divide-x">
        <AnalyticBox
          description="Average Score"
          value={data?.info.averageScore ?? 0}
        />
        <AnalyticBox description="Total attempts" value={totalAttempts} />
        <AnalyticBox
          description="Aproved tests"
          value={data!.info.countAprovedTests}
        />
        <AnalyticBox
          description="Disaproved tests"
          value={data!.info.countDisaprovedTests}
        />
      </section>
      <Button onClick={() => handleDelete()}>Delete test</Button>
    </section>
  );
}

interface Props {
  value: number;
  description: string;
}

function AnalyticBox({ description, value }: Props) {
  return (
    <section className="flex aspect-square flex-col items-center justify-center gap-2">
      <Text>{value}</Text>
      <Text variant={'title'}>{description}</Text>
    </section>
  );
}
