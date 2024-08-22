import { Item } from "../ui/Item";
import React from "react";

interface Props {
  questions: string[];
  onDelete: (name: string) => void;
}
function QuestionsList({ onDelete, questions }: Props) {
  return (
    <ul className="flex flex-col print:gap-12">
      {questions.map((q, index) => (
        <Item key={q + index} onDelete={() => onDelete(q)}>
          {index + 1}. {q}
        </Item>
      ))}
    </ul>
  );
}

export default React.memo(QuestionsList);
