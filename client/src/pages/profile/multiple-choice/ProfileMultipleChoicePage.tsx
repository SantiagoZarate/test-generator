import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { ProfileTestFooter } from '@/components/profile/ProfileTestFooter';
import { ProfileTestHeader } from '@/components/profile/ProfileTestHeader';
import { toast } from '@/components/ui/use-toast';
import { multipleChoiceTestDetailQuery } from '@/router/profileRouter';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { InformationGrid } from './InformationGrid';

export function ProfileMultipleChoicePage() {
  const { id } = useParams();
  const redirect = useNavigate();

  const { isLoading, data, isError } = useQuery(
    multipleChoiceTestDetailQuery(id!)
  );

  const handleDelete = () => {
    multipleChoiceTestAPI.delete(id!).then(() => {
      toast({ title: 'Test deleted succesfully' });
      redirect('/profile');
    });
  };

  const testHasResult =
    (data?.info.countAprovedTests || 0) +
      (data?.info.countDisaprovedTests || 0) >
    0;

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (isError || !data) {
    return <section>There was an error, try again later!</section>;
  }

  return (
    <section className="flex flex-col gap-4">
      <ProfileTestHeader
        id={data?.id}
        title={data?.title}
        typeOfTest="/multiple-choice/"
      />
      {testHasResult ? (
        <InformationGrid info={data!.info} />
      ) : (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-input p-12 backdrop-blur-sm">
          <p>No one has completed this test yet, information will be here</p>
        </div>
      )}
      <ProfileTestFooter onDelete={handleDelete} />
    </section>
  );
}
