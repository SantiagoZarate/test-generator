import { testAPI } from '@/api/test/test.api';
import { ClipboardIcon } from '@/components/icons/ClipboardIcon';
import { toast } from '@/components/ui/use-toast';
import { TestTube2Icon } from 'lucide-react';
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
  const [title, setTitle] = useState<string>('');
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
    []
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
      .create({ questions, title })
      .then((response) => {
        if (!response.ok) {
          toast({
            title: 'Oops there was an error',
            description: 'Error creating share link',
          });
          return;
        }

        linkCreated.current = questions;
        setShareLink(
          window.location.origin + '/basic-test/' + response.data[0]!.id
        );
        toast({
          title: 'Link created',
        });
      })
      .finally(() => {
        setLoadingShareLink(false);
      });
  };

  const handleUpdateTitle = (value: string) => {
    if (value.startsWith(' ')) return;
    setTitle(value);
  };

  return (
    <>
      <form
        aria-label="basic test form"
        action="create basic test form"
        data-testid="basic-test-form"
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 print:hidden"
      >
        <label htmlFor="title" className="flex flex-col gap-2">
          <span className="flex gap-2">
            <TestTube2Icon />
            Test title
          </span>
          <Input
            onChange={(e) => handleUpdateTitle(e.currentTarget.value)}
            placeholder="General knowledge test"
            name="title"
            id="title"
            value={title}
            type="text"
          />
          {error && <span className="text-sm text-red-600">{error}</span>}
        </label>
        <label htmlFor="question" className="flex flex-col gap-2">
          <span className="flex gap-2">
            <FireIcon />
            Add a new question!
          </span>
          <Input
            placeholder="what would happen if P = NP was proved?"
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
              onClearAll={() => {
                setQuestion([]);
                setShareLink('');
                setTitle('');
              }}
              onShare={() => handleShare()}
              disabled={
                loadingShareLink ||
                title.length === 0 ||
                questions.length === 0 ||
                questions.length > 10
              }
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
          <a className="hover:underline" target="_blank" href={shareLink}>
            Go to test shared link
          </a>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
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
