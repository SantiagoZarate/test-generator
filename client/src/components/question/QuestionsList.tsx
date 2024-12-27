import React from 'react';
import { DeleteButton } from '../ui/DeleteButton';
import { Item } from '../ui/Item';
import { List } from '../ui/List';

interface Props {
  questions: string[];
  onDelete: (name: string) => void;
}
function QuestionsList({ onDelete, questions }: Props) {
  return (
    <List data-testid="questions-list">
      {questions.map((q, index) => (
        <Item key={q + index}>
          <DeleteButton
            className="absolute inset-0 my-auto ml-auto opacity-0 group-hover:opacity-100"
            onDelete={() => onDelete(q)}
          />
          {index + 1}. {q}
        </Item>
      ))}
    </List>
  );
}

export default React.memo(QuestionsList);
