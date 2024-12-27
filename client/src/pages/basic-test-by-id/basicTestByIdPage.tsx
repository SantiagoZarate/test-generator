/* eslint-disable @typescript-eslint/no-unused-vars */
import { testAPI } from '@/api/test/test.api';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { PrintButton } from '@/components/ui/PrintButton';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const basicTestSchema = z.object({
  answers: z.array(z.string().min(1, "answer can't be empty")),
});

type BasicTestSchema = z.infer<typeof basicTestSchema>;

export function BasicTestByIdPage() {
  const { id } = useParams();
  const prevAnswers = useRef('');
  const {
    data: test,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['basic-test', id],
    queryFn: () => testAPI.getById({ id: id! }),
  });

  const formState = useForm<BasicTestSchema>({
    resolver: zodResolver(basicTestSchema),
  });

  // Set async default value
  useEffect(() => {
    formState.setValue('answers', test?.questions.map((_) => '') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  const handleSubmitTest = (data: BasicTestSchema) => {
    prevAnswers.current = data.answers.toString();
    testAPI
      .postResult({
        answers: data.answers,
        id: id!,
      })
      .then(() => {
        toast({
          title: 'Result submitted',
          description: 'Thanks for your submission',
        });
      });
  };

  const handleResetTest = () => {
    prevAnswers.current = '';
    formState.setValue(
      'answers',
      test!.questions.map((_) => '')
    );
  };

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
      <Form {...formState}>
        <form
          onSubmit={formState.handleSubmit(handleSubmitTest)}
          className="flex flex-col gap-12"
        >
          {test?.questions.map((question, index) => (
            <FormField
              key={index}
              name={`answers.${index}`}
              control={formState.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col gap-2">
                    {index + 1} - {question}
                    <Input
                      placeholder={`${index + 1} - answer`}
                      className="border-b border-border bg-transparent"
                      type="text"
                      {...field}
                    />
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            disabled={
              formState
                .watch('answers')
                .some((answer) => answer.length === 0) ||
              formState.watch('answers').toString() === prevAnswers.current
            }
          >
            Submit
          </Button>
        </form>
      </Form>
      <footer className="flex justify-end gap-2 print:hidden">
        <PrintButton />
        <Button onClick={handleResetTest}>Reset test</Button>
      </footer>
    </>
  );
}
