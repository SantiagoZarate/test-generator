import { useState } from "react";
import { CrossMicroIcon } from "../../components/icons/CrossMicroIcon";
import { FireIcon } from "../../components/icons/FireIcon";
import { PrintIcon } from "../../components/icons/PrintIcon";
import { Button } from "../../components/ui/Button";
import { BinIcon } from "../../components/icons/BinIcon";
import { ClipboardIcon } from "../../components/icons/ClipboardIcon";
import { INITIAL_QUESTIONS } from "../../constants/mock-questions";

export function BasicTestPage() {
  const [questions, setQuestion] = useState<string[]>(INITIAL_QUESTIONS);
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

  return (
    <>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="print:hidden flex flex-col gap-4 w-full"
      >
        <label htmlFor="question" className="flex flex-col gap-2">
          <span className="flex gap-2">
            <FireIcon />
            add a new question!
          </span>
          <input
            value={value}
            onChange={handleChangeValue}
            name="question"
            type="text"
            className="rounded-lg bg-neutral-800 border border-neutral-600 p-2"
            placeholder="why does javascript suck?"
          />
        </label>
        <button
          disabled={!value.length}
          className="p-2 rounded-md bg-neutral-200 text-neutral-800 disabled:bg-neutral-500"
        >
          submit
        </button>
      </form>
      {questions.length ? (
        <section className="flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <header className="font-bold text-xl">Your questions</header>
            <ul className="flex flex-col print:gap-12">
              {questions.map((q, index) => (
                <li
                  key={`${q}-${index}`}
                  className="relative group flex flex-col gap-8 hover:bg-neutral-700 p-2 rounded-md"
                >
                  <button
                    onClick={() => handleDeleteQuestion(q)}
                    className="absolute group-hover:opacity-100 hover:bg-neutral-700 p-1 opacity-0 transition right-0 top-[20%] mx-2 rounded-md bg-neutral-900 border border-neutral-500"
                  >
                    <CrossMicroIcon />
                  </button>
                  <p className="capitalize">
                    {index + 1}. {q}
                  </p>
                  <div className="hidden print:block border-t border-b border-neutral-500 h-12" />
                </li>
              ))}
            </ul>
          </section>
          <footer className="print:hidden flex gap-2 justify-end">
            <Button
              onClick={() => {
                window.print();
              }}
            >
              Print
              <PrintIcon />
            </Button>
            <Button
              onClick={() => {
                setQuestion([]);
              }}
            >
              Clear All
              <BinIcon />
            </Button>
            <Button
              onClick={async () => {
                let parsedQuestions: string = "Questions:\n";

                questions.forEach((q, index) => {
                  parsedQuestions += "\t" + (index + 1) + " - " + q + "\n";
                });

                await navigator.clipboard.writeText(parsedQuestions);
              }}
            >
              Copy All
              <ClipboardIcon />
            </Button>
          </footer>
        </section>
      ) : (
        <div className="flex justify-center items-center w-full p-4 rounded-md bg-neutral-800 border border-neutral-600">
          You havent introduce any questions yet, go ahead and add some!
        </div>
      )}
    </>
  );
}
