import { QuestionsEmpty } from "../../components/question/QuestionsEmpty";
import QuestionsLayout from "../../components/question/QuestionsLayout";
import QuestionsList from "../../components/question/QuestionsList";
import ActionsFooter from "../../components/common/ActionsFooter";
import { INITIAL_QUESTIONS } from "../../constants/mock-questions";
import { FireIcon } from "../../components/icons/FireIcon";
import { useCallback, useState } from "react";
import { Button } from "../../components/ui/Button";

export function BasicTestPage() {
  const [questions, setQuestion] = useState<string[]>(
    import.meta.env.DEV ? INITIAL_QUESTIONS : []
  );
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setQuestion((prevState) => [...prevState, value]);
    setValue("");
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.startsWith(" ")) return;
    setValue(newValue);
  };

  const handleDeleteQuestion = (text: string) => {
    setQuestion((prevState) => prevState.filter((q) => q !== text));
  };

  const memoizedHandleDelete = useCallback(
    (text: string) => handleDeleteQuestion(text),
    [questions]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="print:hidden flex flex-col gap-4 w-full"
      >
        <label htmlFor="question" className="flex flex-col gap-2">
          <span className="flex gap-2">
            <FireIcon />
            Add a new question!
          </span>
          <input
            className="rounded-lg bg-neutral-800 border border-neutral-600 p-2"
            placeholder="why does javascript suck?"
            onChange={handleChangeValue}
            name="question"
            value={value}
            id="question"
            type="text"
          />
        </label>
        <Button disabled={!value.length}>submit</Button>
      </form>
      {questions.length ? (
        <QuestionsLayout
          footer={
            <ActionsFooter
              dataToCopy={questions}
              onClearAll={() => setQuestion([])}
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
    </>
  );
}
