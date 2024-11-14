import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { BinIcon } from '@/components/icons/BinIcon';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { toast } from '@/components/ui/use-toast';
import { multipleChoiceTestDetailQuery } from '@/router/profileRouter';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MultipleChoiceChart } from './MultipleChoiceChart';

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.origin + '/multiple-choice/' + id);
    toast({
      title: 'Copied to clipboard',
      description: 'Share the link with your friends',
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <section className="flex flex-col gap-2">
          <Text variant={'title'}>{data?.title}</Text>
          <Text>2 de diciembre 2024</Text>
        </section>
        <section className="flex gap-2">
          <Button onClick={handleCopyLink}>Copy Link</Button>
          <Link to={'/multiple-choice/' + id}>
            <Button>Go to Test</Button>
          </Link>
        </section>
      </header>
      <section className="grid grid-cols-2 divide-x border-y lg:grid-cols-4">
        <AnalyticBox
          description="Average Score"
          value={data?.info.averageScore + '/' + data!.info.questionsCount}
        />
        <AnalyticBox
          description="Disaproved tests"
          value={data!.info.countDisaprovedTests}
        />
        <AnalyticBox
          description="Aproved tests"
          value={data!.info.countAprovedTests}
        />
        <MultipleChoiceChart
          aproved={data!.info.countAprovedTests}
          disaproved={data!.info.countDisaprovedTests}
        />
      </section>
      <footer className="flex justify-end">
        <Button onClick={() => handleDelete()}>
          <BinIcon /> Delete test
        </Button>
      </footer>
    </section>
  );
}

interface Props {
  value: number | string;
  description: string;
}

function AnalyticBox({ description, value }: Props) {
  return (
    <section className="flex aspect-square h-full flex-col items-center justify-center gap-2 overflow-hidden">
      <Text>{value}</Text>
      <Text variant={'subtitle'}>{description}</Text>
    </section>
  );
}
