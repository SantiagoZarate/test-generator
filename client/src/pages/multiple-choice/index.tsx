import { useMultipleChoiceTestStore } from '@/stores/multipleChoiceTestStore';
import { QuestionsEmpty } from '../../components/question/QuestionsEmpty';
import { MultipleChoiseForm } from './MultipleChoiseForm';
import { MultipleQuestionsList } from './MultipleQuestionsList';

export function MultipleChoicePage() {
  const questions = useMultipleChoiceTestStore((state) => state.questions);

  return (
    <>
      <MultipleChoiseForm />
      {questions.length ? <MultipleQuestionsList /> : <QuestionsEmpty />}
    </>
  );
}
