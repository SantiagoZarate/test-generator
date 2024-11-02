import ActionsFooter from '@/components/common/ActionsFooter';
import { OptionsList } from '@/components/question/OptionsList';
import QuestionsLayout from '@/components/question/QuestionsLayout';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { useMultipleChoiceTestStore } from '@/stores/multipleChoiceTestStore';
import { useState } from 'react';

export function MultipleQuestionsList() {
  const { questions, deleteQuestion, resetQuestions } =
    useMultipleChoiceTestStore((state) => state);
  const [isLoading] = useState(false);

  const handleShare = () => {
    console.log('Sharing test');
    console.log({ questions });
  };

  return (
    <QuestionsLayout
      footer={
        <ActionsFooter
          loadingShare={isLoading}
          onShare={handleShare}
          onClearAll={() => resetQuestions()}
        />
      }
      list={
        <ul className="flex flex-col">
          {questions.map((multipleChoice, index) => (
            <li
              key={multipleChoice.question + index}
              className="group relative flex flex-col gap-2 rounded-md p-2 hover:bg-neutral-800"
            >
              <DeleteButton
                className="absolute right-0 mx-2 opacity-0 group-hover:opacity-100"
                onDelete={() => deleteQuestion(index)}
              />
              <p className="text-xl font-bold capitalize">
                {multipleChoice.question}
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
