import { testAPI } from "@/api/test.api";
import QuestionsList from "@/components/question/QuestionsList";
import { PrintButton } from "@/components/ui/PrintButton";
import { TestSchema } from "@backend/test.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function TestPage() {
  const { id } = useParams();
  const [test, setTest] = useState<TestSchema>();

  useEffect(() => {
    testAPI.getById({ id: id! }).then((res) => setTest(res));
  }, []);

  return (
    <>
      <header className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl">{test?.title}</h2>
        <p>{test?.created_at}</p>
      </header>
      <QuestionsList onDelete={() => {}} questions={test?.questions ?? []} />
      <footer className="print:hidden flex justify-end">
        <PrintButton />
      </footer>
    </>
  );
}
