import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { PlusIconMIcroIcon } from "../../components/icons/PlusIconMIcroIcon";
import { Input } from "../../components/ui/Input";
import QuestionsLayout from "../../components/question/QuestionsLayout";
import ActionsFooter from "../../components/common/ActionsFooter";
import { QuestionsEmpty } from "../../components/question/QuestionsEmpty";
import { DeleteButton } from "../../components/ui/DeleteButton";
import { OptionsList } from "../../components/question/OptionsList";

interface MultipleChoice {
  question: string;
  options: string[];
  answer: number;
}

export function MultipleChoicePage() {
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState<
    MultipleChoice[]
  >([]);
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMultipleChoiceQuestions((prevState) => [
      ...prevState,
      {
        question: value,
        answer: correctAnswer,
        options,
      },
    ]);
    setValue("");
    setOptions([]);
    setCorrectAnswer(0);
  };

  const handleMultipleChoiceQuestion = (index: number) => {
    setMultipleChoiceQuestions((prevState) => {
      const firstHalf = prevState.slice(0, index);
      const secondHalf = prevState.slice(index + 1);
      return [...firstHalf, ...secondHalf];
    });
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 print:hidden"
      >
        <label htmlFor="question" className="flex flex-col gap-2">
          New question
          <input
            className="bg-neutral-900 border border-neutral-600 rounded-lg p-2"
            placeholder="what does is mean to be stoic?"
            name="question"
            value={value}
            id="question"
            type="text"
            onChange={(e) => {
              if (e.currentTarget.value.startsWith(" ")) return;
              setValue(e.currentTarget.value);
            }}
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
                onChange={(e) => {
                  setOptions((prevState) => {
                    const newOptions = [...prevState];
                    newOptions[index] = e.target.value;
                    return newOptions;
                  });
                }}
              />
              <input
                onChange={() => setCorrectAnswer(index)}
                checked={index === correctAnswer}
                id={"option-checkbox" + index}
                className="peer"
                name="option"
                type="radio"
                hidden
              />
              <label
                className="size-8 border cursor-pointer border-neutral-600 rounded-md bg-transparent peer-checked:bg-green-400 transition"
                htmlFor={"option-checkbox" + index}
              />
              <DeleteButton
                onDelete={() =>
                  setOptions((prevState) => {
                    const firstHalf = prevState.slice(0, index);
                    const secondHalf = prevState.slice(index + 1);
                    if (correctAnswer === index) setCorrectAnswer(0);
                    return [...firstHalf, ...secondHalf];
                  })
                }
              />
            </span>
          </label>
        ))}
        <Button
          onClick={() => setOptions((prevState) => [...prevState, ""])}
          type="button"
          className="border-dashed border-2 bg-neutral-900"
        >
          Add option
          <PlusIconMIcroIcon />
        </Button>
        <Button disabled={options.length < 2}>Submit</Button>
      </form>
      {multipleChoiceQuestions.length ? (
        <QuestionsLayout
          footer={
            <ActionsFooter
              dataToCopy={multipleChoiceQuestions}
              onClearAll={() => setMultipleChoiceQuestions([])}
            />
          }
          list={
            <ul className="flex flex-col">
              {multipleChoiceQuestions.map((multipleChoice, index) => (
                <li
                  key={multipleChoice.question + index}
                  className="relative flex flex-col gap-2 hover:bg-neutral-800 p-2 rounded-md group"
                >
                  <DeleteButton
                    className="absolute group-hover:opacity-100 opacity-0 right-0 mx-2"
                    onDelete={() => handleMultipleChoiceQuestion(index)}
                  />
                  <p className="font-bold capitalize text-xl">
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
      ) : (
        <QuestionsEmpty />
      )}
    </>
  );
}
