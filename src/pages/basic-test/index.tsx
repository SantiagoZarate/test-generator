import { QuestionsEmpty } from "../../components/question/QuestionsEmpty";
import QuestionsLayout from "../../components/question/QuestionsLayout";
import QuestionsList from "../../components/question/QuestionsList";
import ActionsFooter from "../../components/common/ActionsFooter";
import { FireIcon } from "../../components/icons/FireIcon";
import { useCallback, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { INITIAL_QUESTIONS } from "../../constants/mock-questions";
import { getAiGeneratedSuggestions } from "@/lib/perplexity";

export function BasicTestPage() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [questions, setQuestion] = useState<string[]>(
    import.meta.env.DEV ? INITIAL_QUESTIONS : []
  );

  const handleGetAiSuggestions = async () => {
    setLoadingAI(true);
    await getAiGeneratedSuggestions(questions).finally(() => {
      setLoadingAI(false);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < 5) {
      setError("Question too short");
      return;
    } else if (value.length > 120) {
      setError("Question too large");
      return;
    }
    setQuestion((prevState) => [...prevState, value]);
    setValue("");
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.startsWith(" ")) return;
    setValue(newValue);
    setError("");
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
          <Input
            placeholder="why does javascript suck?"
            onChange={handleChangeValue}
            name="question"
            value={value}
            id="question"
            type="text"
          />
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </label>
        <Button disabled={!value.length}>submit</Button>
      </form>
      {questions.length > 4 && (
        <section>
          <Button
            disabled={loadingAI}
            onClick={handleGetAiSuggestions}
            className="w-full"
          >
            get ai generated suggestions
          </Button>
        </section>
      )}
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
