import { PlusIconMIcroIcon } from '@/components/icons/PlusIconMIcroIcon';
import { Button } from '@/components/ui/Button';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { Input } from '@/components/ui/Input';
import { useMultipleChoiceTestStore } from '@/stores/multipleChoiceTestStore';
import { FormEvent } from 'react';

export function MultipleChoiseForm() {
  const {
    addOption,
    addQuestion,
    correctAnswer,
    deleteOption,
    newQuestionValue,
    options,
    updateCorrectOption,
    updateOptionValue,
    updateNewQuestion,
  } = useMultipleChoiceTestStore((state) => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addQuestion();
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 print:hidden"
    >
      <label htmlFor="question" className="flex flex-col gap-2">
        New question
        <input
          className="rounded-lg border border-neutral-600 bg-neutral-900 p-2"
          placeholder="what does is mean to be stoic?"
          name="question"
          value={newQuestionValue}
          id="question"
          type="text"
          onChange={(e) => updateNewQuestion(e.target.value)}
        />
      </label>
      {options.map((option, index) => (
        <label
          className="flex flex-col gap-1 capitalize"
          htmlFor={`option-${index}`}
          key={index}
        >
          {`option ${index + 1}`}
          <span className="flex gap-2">
            <Input
              placeholder={`Option ${index + 1} answer`}
              className="flex-1 text-xs"
              id={`option-${index}`}
              value={option}
              type="text"
              onChange={(e) => updateOptionValue(index, e.target.value)}
            />
            <input
              onChange={() => updateCorrectOption(index)}
              checked={index === correctAnswer}
              id={'option-checkbox' + index}
              className="peer"
              name="option"
              type="radio"
              hidden
            />
            <label
              className="size-8 cursor-pointer rounded-md border border-neutral-600 bg-transparent transition peer-checked:bg-green-400"
              htmlFor={'option-checkbox' + index}
            />
            <DeleteButton onDelete={() => deleteOption(index)} />
          </span>
        </label>
      ))}
      <Button
        onClick={addOption}
        type="button"
        className="border-2 border-dashed bg-neutral-900"
      >
        Add option
        <PlusIconMIcroIcon />
      </Button>
      <Button disabled={options.length < 2}>Submit</Button>
    </form>
  );
}
