import { testAPI } from "@/api/test.api";
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";
import { SparkelIcon } from "@/components/icons/SparkelIcon";
import { toast } from "@/components/ui/use-toast";
import { MIN_QUESTIONS_FOR_AI } from "@/data/constants";
import { getAiGeneratedSuggestions } from "@/lib/perplexity";
import { useCallback, useRef, useState } from "react";
import ActionsFooter from "../../components/common/ActionsFooter";
import { FireIcon } from "../../components/icons/FireIcon";
import { QuestionsEmpty } from "../../components/question/QuestionsEmpty";
import QuestionsLayout from "../../components/question/QuestionsLayout";
import QuestionsList from "../../components/question/QuestionsList";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { INITIAL_QUESTIONS } from "../../data/mock-questions";
import "./hover.css";

export function BasicTestPage() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [loadingShareLink, setLoadingShareLink] = useState<boolean>(false);
  const [AISuggestions, setAISuggestions] = useState<string[]>([]);
  const linkCreated = useRef<string[]>([]);
  const [shareLink, setShareLink] = useState<string>("");
  const [questions, setQuestion] = useState<string[]>(
    import.meta.env.DEV ? INITIAL_QUESTIONS : []
  );

  const handleGetAiSuggestions = async () => {
    setLoadingAI(true);
    await getAiGeneratedSuggestions(questions)
      .then((response) => {
        console.log(response);
        setAISuggestions(response.slice(0, 3));
      })
      .finally(() => {
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
    handleAddQuestion(value);
    setValue("");
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.startsWith(" ")) return;
    setValue(newValue);
    setError("");
  };

  const handleAddQuestion = (question: string) => {
    if (questions.find((q) => q === question)) {
      toast({
        title: "Oops there was an error!",
        description: "Duplicated questions are not allowed",
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
    [questions]
  );

  const handleShare = () => {
    // If questions hasnt changed since last shared, do not create another request
    if (linkCreated.current === questions) {
      toast({
        title: "There was an error",
        description: "A shared link was already created for this questions",
      });
      return;
    }

    setLoadingShareLink(true);

    testAPI
      .create({ questions, title: "Mocked test title" })
      .then((response) => {
        if (!response.ok) {
          toast({
            title: "Oops there was an error",
            description: "Error creating share link",
          });
          return;
        }
        linkCreated.current = questions;
        setShareLink(response.data[0].id);
        toast({
          title: "Link created",
        });
      })
      .finally(() => {
        setLoadingShareLink(false);
      });
  };

  return (
    <>
      <form
        data-testid="Basic test form"
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
      <section className="print:hidden flex justify-center">
        {questions.length >= MIN_QUESTIONS_FOR_AI ? (
          <>
            <Button
              disabled={loadingAI}
              onClick={handleGetAiSuggestions}
              className="w-full inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 hover:-translate-y-1 transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              get ai generated suggestions
            </Button>
            <ul className="flex flex-col group py-4">
              {AISuggestions.map((suggestion, index) => (
                <li
                  className="p-4 rounded-md hover:bg-card cursor-pointer flex items-center gap-2 hover:-translate-y-1 transition"
                  onClick={() => {
                    handleAddQuestion(suggestion);
                    setAISuggestions((prevState) =>
                      prevState.filter((p) => p !== suggestion)
                    );
                  }}
                  key={index}
                >
                  <SparkelIcon />
                  {suggestion}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Add {MIN_QUESTIONS_FOR_AI - (questions.length ?? 0)} more questions
            to allow AI Assistance
          </p>
        )}
      </section>
      {questions.length ? (
        <QuestionsLayout
          footer={
            <ActionsFooter
              loadingShare={loadingShareLink}
              dataToCopy={questions}
              onClearAll={() => setQuestion([])}
              onShare={() => handleShare()}
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
        <section className="print:hidden p-4 rounded-md bg-card border-dashed border-border flex gap-4 justify-center items-center">
          <a
            className="hover:underline"
            href={`http://localhost:5173/${shareLink}`}
          >
            Go to test shared link
          </a>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:5173/${shareLink}`
              );
              toast({ title: "Copied to clipboard" });
            }}
          >
            <ClipboardIcon />
          </Button>
        </section>
      )}
    </>
  );
}
