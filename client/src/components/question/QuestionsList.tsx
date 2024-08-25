import { DeleteButton } from '../ui/DeleteButton';
import { Item } from '../ui/Item';
import React from 'react';
import { List } from '../ui/List';

interface Props {
  questions: string[];
  onDelete: (name: string) => void;
}
function QuestionsList({ onDelete, questions }: Props) {
  return (
    <List>
      {questions.map((q, index) => (
        <Item key={q + index}>
          <DeleteButton
            className="absolute right-0 top-[20%] mx-2 opacity-0 group-hover:opacity-100"
            onDelete={() => onDelete(q)}
          />
          {index + 1}. {q}
        </Item>
      ))}
    </List>
  );
}

export default React.memo(QuestionsList);
