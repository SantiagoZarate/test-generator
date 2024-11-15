import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { BinIcon } from '@/components/icons/BinIcon';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { toast } from '@/components/ui/use-toast';
import { multipleChoiceTestDetailQuery } from '@/router/profileRouter';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { InformationGrid } from './InformationGrid';

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

  const testHasResult =
    data!.info.countAprovedTests + data!.info.countDisaprovedTests > 0;

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
      {testHasResult ? (
        <InformationGrid info={data!.info} />
      ) : (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-input p-12 backdrop-blur-sm">
          <p>No one has completed this test yet, information will be here</p>
        </div>
      )}
      <footer className="flex justify-end">
        <Button onClick={() => handleDelete()}>
          <BinIcon /> Delete test
        </Button>
      </footer>
    </section>
  );
}
