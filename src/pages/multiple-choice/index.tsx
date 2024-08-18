import { useState } from "react";
import { Button } from "../../components/ui/Button";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMultipleChoiceQuestions((prevState) => [
      ...prevState,
      {
        question: value,
        answer: 0,
        options,
      },
    ]);
    setValue("");
    setOptions([]);
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4"
      >
        <label htmlFor="" className="flex flex-col gap-2">
          new question
          <input
            onChange={(e) => {
              if (e.currentTarget.value.startsWith(" ")) return;
              setValue(e.currentTarget.value);
            }}
            type="text"
            value={value}
            name="question"
            className="bg-neutral-900 border border-neutral-600 rounded-lg p-2"
            placeholder="what does is mean to be stoic?"
          />
        </label>
        <Button
          onClick={() => setOptions((prevState) => [...prevState, ""])}
          type="button"
        >
          add option
        </Button>
        {options.map((option, index) => (
          <input
            className="bg-neutral-900 border border-neutral-600 rounded-lg p-2"
            placeholder={`option ${index + 1}`}
            name={`option-${index}`}
            key={index}
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
        ))}
        <Button disabled={options.length < 2}>
          create multiple choise question
        </Button>
      </form>
      <section>
        <ul className="flex flex-col gap-8">
          {multipleChoiceQuestions.map((multipleChoice) => (
            <li className="flex flex-col gap-2">
              <p className="font-bold capitalize text-xl">
                {multipleChoice.question}
              </p>
              <ul className="flex flex-col gap-1">
                {multipleChoice.options.map((option, index) => (
                  <li key={index}>
                    <p className="capitalize text-sm">{option}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
