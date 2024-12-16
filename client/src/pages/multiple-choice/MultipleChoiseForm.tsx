import { PlusIconMIcroIcon } from '@/components/icons/PlusIconMIcroIcon';
import { Button } from '@/components/ui/Button';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { Input } from '@/components/ui/Input';
import { toast } from '@/components/ui/use-toast';
import { useMultipleChoiceTestStore } from '@/stores/multipleChoiceTestStore';
import { FormEvent } from 'react';

export function MultipleChoiseForm() {
  const {
    addOption,
    addQuestion,
    deleteOption,
    newQuestionValue,
    options,
    toggleOptionCorrect,
    updateOptionValue,
    updateNewQuestion,
    testTitle,
    updateTitle,
    decreaseRightAnswersToPass,
    increaseRightAnswersToPass,
    rightAnswersToPass,
    questions,
  } = useMultipleChoiceTestStore((state) => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addQuestion();
  };

  const handleToggleOptionCorrect = (optionIndex: number) => {
    const correctOptionsCount = options.reduce(
      (acc, curr) => acc + (curr.isCorrect ? 1 : 0),
      0
    );

    // Siempre tiene que haber una respuesta correcta como minimo
    if (correctOptionsCount === 1 && options[optionIndex]!.isCorrect) {
      toast({
        title: 'No se modifico el estado',
        description: 'Debe haber como minimo 1 respuesta correcta',
      });
      return;
    }

    toggleOptionCorrect(optionIndex);
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 print:hidden"
    >
      <header className="flex items-center gap-2">
        <label htmlFor="title" className="flex flex-1 flex-col gap-2">
          Test title
          <input
            className="rounded-lg border border-neutral-600 bg-neutral-900 p-2"
            placeholder="My new test"
            name="title"
            id="title"
            value={testTitle}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </label>
        <label
          htmlFor="right_answers_to_pass"
          className="flex flex-1 flex-col gap-2"
        >
          Right answers to pass the thest
          <section className="flex w-full items-center gap-2">
            <button
              className="rounded-md bg-primary p-2 text-background disabled:opacity-25"
              type="button"
              onClick={decreaseRightAnswersToPass}
              disabled={!rightAnswersToPass}
            >
              -
            </button>
            <span className="w-full rounded-lg border border-neutral-600 bg-neutral-900 p-2">
              {rightAnswersToPass}
            </span>
            <button
              className="rounded-md bg-primary p-2 text-background disabled:opacity-25"
              type="button"
              onClick={increaseRightAnswersToPass}
              disabled={rightAnswersToPass === questions.length}
            >
              +
            </button>
          </section>
        </label>
      </header>
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
      {options.map((option, optionIndex) => (
        <label
          className="flex flex-col gap-1 capitalize"
          htmlFor={`option-${optionIndex}`}
          key={optionIndex}
        >
          {`option ${optionIndex + 1}`}
          <span className="flex gap-2">
            <Input
              placeholder={`Option ${optionIndex + 1} answer`}
              className="flex-1 text-xs"
              id={`option-${optionIndex}`}
              value={option.content}
              type="text"
              onChange={(e) => updateOptionValue(optionIndex, e.target.value)}
            />
            <input
              onChange={() => handleToggleOptionCorrect(optionIndex)}
              id={'option-checkbox' + optionIndex}
              checked={option.isCorrect}
              className="peer"
              name="option"
              type="checkbox"
              hidden
            />
            <label
              className="size-8 cursor-pointer rounded-md border border-neutral-600 bg-transparent transition hover:bg-neutral-700 peer-checked:bg-green-400"
              htmlFor={'option-checkbox' + optionIndex}
            />
            <DeleteButton onDelete={() => deleteOption(optionIndex)} />
          </span>
        </label>
      ))}
      <Button
        onClick={addOption}
        type="button"
        className="border-2 border-dashed bg-neutral-900 text-foreground"
      >
        Add option
        <PlusIconMIcroIcon />
      </Button>
      <Button disabled={options.length < 2}>Submit</Button>
    </form>
  );
}
