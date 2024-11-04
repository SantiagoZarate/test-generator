import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import ActionsFooter from '@/components/common/ActionsFooter';
import { OptionsList } from '@/components/question/OptionsList';
import QuestionsLayout from '@/components/question/QuestionsLayout';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { useMultipleChoiceTestStore } from '@/stores/multipleChoiceTestStore';
import { useState } from 'react';

export function MultipleQuestionsList() {
  const { questions, deleteQuestion, resetQuestions, testTitle } =
    useMultipleChoiceTestStore((state) => state);
  const [isLoading] = useState(false);
  const [createdTestID, setCreatedTestID] = useState<string>('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleShare = () => {
    setIsCreatingPost(false);
    multipleChoiceTestAPI
      .create({
        title: testTitle,
        questions,
      })
      .then(setCreatedTestID)
      .then(() => setIsCreatingPost(false));
  };

  const url = window.location.origin + '/multiple-choice/' + createdTestID;

  return (
    <QuestionsLayout
      footer={
        <>
          {createdTestID && (
            <a
              target="_blank"
              href={url}
              className="border border-border p-4 text-center underline hover:text-blue-800"
            >
              {url}
            </a>
          )}
          <ActionsFooter
            loadingShare={isLoading || createdTestID.length > 1}
            onShare={handleShare}
            onClearAll={() => resetQuestions()}
            isCreatingTest={isCreatingPost}
          />
        </>
      }
      list={
        <ul className="flex flex-col">
          {questions.map((multipleChoice, index) => (
            <li
              key={multipleChoice.content + index}
              className="group relative flex flex-col gap-2 rounded-md p-2 hover:bg-neutral-800"
            >
              <DeleteButton
                className="absolute right-0 mx-2 opacity-0 group-hover:opacity-100"
                onDelete={() => deleteQuestion(index)}
              />
              <p className="text-xl font-bold capitalize">
                {multipleChoice.content}
              </p>
              <OptionsList
                correctOption={multipleChoice.answer}
                options={multipleChoice.options}
              />
            </li>
          ))}
        </ul>
      }
    />
  );
}
