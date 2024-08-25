import React from 'react';

interface Props {
  footer: JSX.Element;
  list: JSX.Element;
}

function QuestionsLayout({ footer, list }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <header className="text-xl font-bold">Your questions</header>
        {list}
      </section>
      {footer}
    </section>
  );
}

export default React.memo(QuestionsLayout);
