import { testAPI } from '@/api/test/test.api';
import { ClipboardIcon } from '@/components/icons/ClipboardIcon';
import { toast } from '@/components/ui/use-toast';
import { useCallback, useRef, useState } from 'react';
import ActionsFooter from '../../components/common/ActionsFooter';
import { FireIcon } from '../../components/icons/FireIcon';
import { QuestionsEmpty } from '../../components/question/QuestionsEmpty';
import QuestionsLayout from '../../components/question/QuestionsLayout';
import QuestionsList from '../../components/question/QuestionsList';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { INITIAL_QUESTIONS } from '../../data/mock-questions';
import './hover.css';

export function BasicTestPage() {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loadingShareLink, setLoadingShareLink] = useState<boolean>(false);
  const linkCreated = useRef<string[]>([]);
  const [shareLink, setShareLink] = useState<string>('');
  const [questions, setQuestion] = useState<string[]>(
    import.meta.env.MODE === 'development' ? INITIAL_QUESTIONS : []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < 5) {
      setError('Question too short');
      return;
    } else if (value.length > 120) {
      setError('Question too large');
      return;
    }
    handleAddQuestion(value);
    setValue('');
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.startsWith(' ')) return;
    setValue(newValue);
    setError('');
  };

  const handleAddQuestion = (question: string) => {
    if (questions.find((q) => q === question)) {
      toast({
        title: 'Oops there was an error!',
        description: 'Duplicated questions are not allowed',
      });
      return;
    }
    setQuestion((prevState) => [...prevState, question]);
  };

  const handleDeleteQuestion = (text: string) => {
    setQuestion((prevState) => prevState.filter((q) => q !== text));
  };

  const memoizedHandleDelete = useCallback(
    (text: string) => handleDeleteQuestion(text),
    [questions]
  );

  const handleShare = () => {
    // If questions hasnt changed since last shared, do not create another request
    if (linkCreated.current === questions) {
      toast({
        title: 'There was an error',
        description: 'A shared link was already created for this questions',
      });
      return;
    }

    setLoadingShareLink(true);

    testAPI
      .create({ questions, title: 'Mocked test title' })
      .then((response) => {
        if (!response.ok) {
          toast({
            title: 'Oops there was an error',
            description: 'Error creating share link',
          });
          return;
        }
        linkCreated.current = questions;
        setShareLink(response.data.results.id);
        toast({
          title: 'Link created',
        });
      })
      .finally(() => {
        setLoadingShareLink(false);
      });
  };

  return (
    <>
      <form
        aria-label="basic test form"
        action="create basic test form"
        data-testid="basic-test-form"
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 print:hidden"
      >
        <label htmlFor="question" className="flex flex-col gap-2">
          <span className="flex gap-2">
            <FireIcon />
            Add a new question!
          </span>
          <Input
            placeholder="why does javascript suck?"
            onChange={handleChangeValue}
            name="question"
            value={value}
            id="question"
            type="text"
          />
          {error && <span className="text-sm text-red-600">{error}</span>}
        </label>
        <Button disabled={!value.length}>submit</Button>
      </form>
      {questions.length ? (
        <QuestionsLayout
          footer={
            <ActionsFooter
              loadingShare={loadingShareLink}
              onClearAll={() => setQuestion([])}
              onShare={() => handleShare()}
            />
          }
          list={
            <QuestionsList
              onDelete={memoizedHandleDelete}
              questions={questions}
            />
          }
        />
      ) : (
        <QuestionsEmpty />
      )}
      {shareLink && (
        <section className="flex items-center justify-center gap-4 rounded-md border-dashed border-border bg-card p-4 print:hidden">
          <a
            className="hover:underline"
            href={`http://localhost:5173/${shareLink}`}
          >
            Go to test shared link
          </a>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:5173/${shareLink}`
              );
              toast({ title: 'Copied to clipboard' });
            }}
          >
            <ClipboardIcon />
          </Button>
        </section>
      )}
    </>
  );
}
