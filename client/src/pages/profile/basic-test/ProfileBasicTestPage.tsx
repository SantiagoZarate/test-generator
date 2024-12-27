import { testAPI } from '@/api/test/test.api';
import { Submission } from '@/api/test/test.api.type';
import { ProfileTestFooter } from '@/components/profile/ProfileTestFooter';
import { ProfileTestHeader } from '@/components/profile/ProfileTestHeader';
import { Text } from '@/components/ui/Text';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function ProfileBasicTestPage() {
  const { id } = useParams();
  const {
    data: test,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile-basic-test', id],
    queryFn: () => testAPI.getByIdWithInfo({ id: id! }),
  });

  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const handleDelete = () => {
    console.log('DELETIN TEST');
  };

  if (isLoading) {
    return <p>is loading...</p>;
  }

  if (isError || !test) {
    return <p>there was an error, try again later!</p>;
  }

  return (
    <section className="flex flex-col gap-8">
      <ProfileTestHeader
        id={test.id}
        title={test.title}
        typeOfTest="/basic-test/"
      />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="flex flex-col gap-6 rounded-md bg-primary/10 p-6">
          <Text variant={'subtitle'}>Questions</Text>
          <ul className="flex flex-col gap-2 text-sm text-secondary">
            {test?.questions.map((question, index) => (
              <li key={index}>
                {index + 1} - {question.content}
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-6">
          <Text variant={'subtitle'}>Submissions</Text>
          <ul className="flex flex-col gap-1 text-sm text-secondary">
            {test.results.map((result, index) => {
              const distanceToNow = formatDistanceToNow(result.created_at, {
                addSuffix: true,
              });
              return (
                <li
                  data-selected={selectedSubmission?.id === result.id}
                  onClick={() => setSelectedSubmission(result)}
                  className="cursor-pointer rounded-lg border px-2 py-1 text-xs transition hover:-translate-y-1 hover:bg-muted data-[selected='true']:bg-green-800"
                  key={index}
                >
                  {distanceToNow}
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <section>
        <ul className="flex flex-col divide-y">
          {selectedSubmission?.answers.map((answer, index) => (
            <li className="py-2" key={index}>
              {index + 1} - {answer}
            </li>
          ))}
        </ul>
      </section>
      <ProfileTestFooter onDelete={handleDelete} />
    </section>
  );
}
